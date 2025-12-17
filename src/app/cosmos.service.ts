import { HttpClient } from '@angular/common/http';
import {
	Injectable,
	InjectionToken,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';
import { WalletService } from './wallet/wallet.service';

export type CosmosConfig = {
	chainId: string;
	chainName: string;
	rpc: string;
	rest: string;

	bech32Prefix: {
		accAddr: string;
		accPub: string;
		valAddr: string;
		valPub: string;
		consAddr: string;
		consPub: string;
	};

	coin: {
		denom: string;
		minimalDenom: string;
		decimals: number;
	};

	gasPrice: {
		low: number;
		average: number;
		high: number;
	};

	defaultGasPriceString?: string;
};

export const COSMOS_CONFIG = new InjectionToken<CosmosConfig>('COSMOS_CONFIG');

type BankBalancesResponse = {
	balances?: Array<{ denom?: string; amount?: string }>;
};

type TxsByEventsResponse = {
	txs?: any[];
	tx_responses?: Array<{
		txhash?: string;
		height?: string | number;
		timestamp?: string;
		code?: number; // 0 = success
		raw_log?: string;
	}>;
	pagination?: { next_key?: string | null; total?: string };
};

export type TxItem = {
	hash: string;
	height: number;
	timestamp: string;
	success: boolean;

	direction: 'in' | 'out' | 'self';
	from: string;
	to: string;

	amountMinimal: bigint;
	memo: string;
};

@Injectable({ providedIn: 'root' })
export class CosmosService {
	private readonly http = inject(HttpClient);
	private readonly wallet = inject(WalletService);

	readonly isConnecting = signal(false);
	readonly isSending = signal(false);

	readonly address = this.wallet.address;

	readonly minimalBalance = signal<bigint>(0n);

	readonly toAddress = signal<string>('');
	readonly amount = signal<string>('0.000001');
	readonly txHash = signal<string>('');

	readonly error = signal<string>('');

	readonly isLoadingTxs = signal(false);
	readonly txs = signal<TxItem[]>([]);

	readonly balance = computed(() => {
		const d = BigInt(10 ** environment.cosmos.coin.decimals);
		const whole = this.minimalBalance() / d;
		const frac = this.minimalBalance() % d;
		return `${whole}.${frac.toString().padStart(environment.cosmos.coin.decimals, '0')}`;
	});

	constructor() {
		effect(() => {
			const addr = this.address();
			if (addr && !this.toAddress()) this.toAddress.set(addr);
		});
	}

	async connectKeplr(): Promise<void> {
		this.error.set('');
		this.txHash.set('');
		this.isConnecting.set(true);

		try {
			await this.wallet.connect('keplr');
			await this.refreshBalance();
			await this.refreshTransactions();
		} catch (e) {
			this.error.set(this.formatErr(e));
		} finally {
			this.isConnecting.set(false);
		}
	}

	async refreshBalance(): Promise<void> {
		this.error.set('');
		const addr = this.address();
		if (!addr) return;

		try {
			const url = `${environment.cosmos.rest}/cosmos/bank/v1beta1/balances/${encodeURIComponent(addr)}`;
			const res = await firstValueFrom(
				this.http.get<BankBalancesResponse>(url),
			);

			const balances = res?.balances ?? [];
			const amtStr =
				balances.find(
					(b) => b.denom === environment.cosmos.coin.minimalDenom,
				)?.amount ?? '0';

			this.minimalBalance.set(BigInt(amtStr));
		} catch (e) {
			this.error.set(this.formatErr(e));
		}
	}

	async refreshTransactions(limit = 20): Promise<void> {
		this.error.set('');
		const addr = this.address();
		if (!addr) return;

		this.isLoadingTxs.set(true);

		try {
			const [incoming, outgoing] = await Promise.all([
				this.fetchTxsByEvent(`transfer.recipient='${addr}'`, limit),
				this.fetchTxsByEvent(`transfer.sender='${addr}'`, limit),
			]);

			// merge by hash
			const map = new Map<string, TxItem>();
			for (const tx of [...incoming, ...outgoing]) map.set(tx.hash, tx);

			const merged = Array.from(map.values()).sort(
				(a, b) => b.height - a.height,
			);

			this.txs.set(merged);
		} catch (e) {
			this.error.set(this.formatErr(e));
		} finally {
			this.isLoadingTxs.set(false);
		}
	}

	private async fetchTxsByEvent(
		event: string,
		limit: number,
	): Promise<TxItem[]> {
		const url =
			`${environment.cosmos.rest}/cosmos/tx/v1beta1/txs` +
			`?query=${encodeURIComponent(event)}` +
			`&pagination.limit=${encodeURIComponent(String(limit))}` +
			`&order_by=ORDER_BY_DESC`;

		const res = await firstValueFrom(
			this.http.get<TxsByEventsResponse>(url),
		);

		const txs = res?.txs ?? [];
		const responses = res?.tx_responses ?? [];

		const out: TxItem[] = [];
		for (let i = 0; i < Math.min(txs.length, responses.length); i++) {
			const tx = txs[i] ?? {};
			const tr = responses[i] ?? {};

			const parsed = this.parseFirstMsgSend(tx);
			if (!parsed) continue;

			const hash = String(tr.txhash ?? '').toUpperCase();
			if (!hash) continue;

			const height = Number(tr.height ?? 0);
			const timestamp = String(tr.timestamp ?? '');
			const success = Number(tr.code ?? 0) === 0;

			const my = this.address();
			const direction: TxItem['direction'] =
				parsed.from === my && parsed.to === my
					? 'self'
					: parsed.to === my
						? 'in'
						: 'out';

			out.push({
				hash,
				height,
				timestamp,
				success,
				direction,
				from: parsed.from,
				to: parsed.to,
				amountMinimal: parsed.amountMinimal,
				memo: String(tx?.body?.memo ?? ''),
			});
		}

		return out;
	}

	private parseFirstMsgSend(tx: any): null | {
		from: string;
		to: string;
		amountMinimal: bigint;
	} {
		const msgs: any[] = tx?.body?.messages ?? [];
		for (const m of msgs) {
			// REST usually returns messages with "@type"
			const t = m?.['@type'] ?? m?.type_url ?? '';
			const isSend =
				t === '/cosmos.bank.v1beta1.MsgSend' ||
				t === 'cosmos.bank.v1beta1.MsgSend';

			if (!isSend) continue;

			const from = String(m?.from_address ?? '');
			const to = String(m?.to_address ?? '');
			const amounts: any[] = m?.amount ?? [];
			const coin = amounts.find(
				(c) => c?.denom === environment.cosmos.coin.minimalDenom,
			);

			const amtStr = String(coin?.amount ?? '0');
			let amountMinimal = 0n;
			try {
				amountMinimal = BigInt(amtStr);
			} catch {
				amountMinimal = 0n;
			}

			return { from, to, amountMinimal };
		}

		return null;
	}

	async send(): Promise<void> {
		this.error.set('');
		this.txHash.set('');

		const from = this.address().trim();
		const to = this.toAddress().trim();
		const amtMain = this.amount().trim();

		if (!from) {
			this.error.set('Connect wallet first.');
			return;
		}
		if (!to) {
			this.error.set('To address is required.');
			return;
		}

		let amountMinimal: bigint;
		try {
			amountMinimal = this.mainToMinimal(amtMain);
		} catch {
			this.error.set(
				`Amount must be a number like 1, 0.5, 0.${'0'.repeat(environment.cosmos.coin.decimals - 1)}1`,
			);
			return;
		}
		if (amountMinimal <= 0n) {
			this.error.set('Amount must be > 0');
			return;
		}

		this.isSending.set(true);

		try {
			const { SigningStargateClient, GasPrice } = await import(
				'@cosmjs/stargate'
			);

			const signer = await this.wallet.getSigner();

			const gasPriceStr =
				environment.cosmos.defaultGasPriceString ??
				`${environment.cosmos.gasPrice.average}${environment.cosmos.coin.minimalDenom}`;

			const client = await SigningStargateClient.connectWithSigner(
				environment.cosmos.rpc,
				signer as any,
				{
					gasPrice: GasPrice.fromString(gasPriceStr),
				},
			);

			const result = await client.sendTokens(
				from,
				to,
				[
					{
						denom: environment.cosmos.coin.minimalDenom,
						amount: amountMinimal.toString(),
					},
				],
				'auto' as any,
				'uagd transfer',
			);

			this.txHash.set(result.transactionHash || '');
			await this.refreshBalance();
			await this.refreshTransactions();
		} catch (e) {
			this.error.set(this.formatErr(e));
		} finally {
			this.isSending.set(false);
		}
	}

	private mainToMinimal(value: string): bigint {
		const normalized = value.replace(',', '.');
		if (!/^\d+(\.\d+)?$/.test(normalized)) throw new Error('bad number');

		const [whole, fracRaw = ''] = normalized.split('.');
		const zeros = '0'.repeat(environment.cosmos.coin.decimals);
		const frac = (fracRaw + zeros).slice(
			0,
			environment.cosmos.coin.decimals,
		);

		const scale = BigInt(10 ** environment.cosmos.coin.decimals);
		return BigInt(whole) * scale + BigInt(frac);
	}

	private formatErr(e: unknown): string {
		if (e instanceof Error) return e.message;

		if (e && typeof e === 'object') {
			const anyE = e as any;
			const msg =
				anyE?.error?.message ?? anyE?.message ?? anyE?.toString?.();
			if (typeof msg === 'string') return msg;

			try {
				return JSON.stringify(anyE);
			} catch {
				return String(anyE);
			}
		}

		return String(e);
	}
}
