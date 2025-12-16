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
		denom: string; // "UAG"
		minimalDenom: string; // "uuag"
		decimals: number; // 6
	};

	gasPrice: {
		low: number;
		average: number;
		high: number;
	};

	defaultGasPriceString?: string; // e.g. "0.025uuag"
};

export const COSMOS_CONFIG = new InjectionToken<CosmosConfig>('COSMOS_CONFIG');

type Keplr = {
	experimentalSuggestChain: (c: unknown) => Promise<void>;
	enable: (chainId: string) => Promise<void>;
	getKey: (chainId: string) => Promise<{ bech32Address: string }>;
	getOfflineSignerAuto?: (chainId: string) => any;
};

type BankBalancesResponse = {
	balances?: Array<{ denom?: string; amount?: string }>;
};

@Injectable({ providedIn: 'root' })
export class CosmosService {
	private readonly http = inject(HttpClient);

	readonly isConnecting = signal(false);
	readonly isSending = signal(false);

	readonly address = signal<string>('');
	readonly minimalBalance = signal<bigint>(0n); // in minimal denom (e.g. uuag)

	// Send form (prefilled with own address)
	readonly toAddress = signal<string>('');
	readonly amount = signal<string>('0.000001'); // in main denom (e.g. UAG)
	readonly txHash = signal<string>('');

	readonly error = signal<string>('');

	readonly balance = computed(() => {
		const d = BigInt(10 ** environment.cosmos.coin.decimals);
		const whole = this.minimalBalance() / d;
		const frac = this.minimalBalance() % d;
		return `${whole}.${frac.toString().padStart(environment.cosmos.coin.decimals, '0')}`;
	});

	constructor() {
		// prefill "to" with own address whenever we get address (and if empty)
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
			const keplr = (window as any)?.keplr as Keplr | undefined;
			if (!keplr) throw new Error('Keplr extension not found');

			await keplr.experimentalSuggestChain({
				chainId: environment.cosmos.chainId,
				chainName: environment.cosmos.chainName,
				rpc: environment.cosmos.rpc,
				rest: environment.cosmos.rest,
				bip44: { coinType: 118 },
				bech32Config: {
					bech32PrefixAccAddr:
						environment.cosmos.bech32Prefix.accAddr,
					bech32PrefixAccPub: environment.cosmos.bech32Prefix.accPub,
					bech32PrefixValAddr:
						environment.cosmos.bech32Prefix.valAddr,
					bech32PrefixValPub: environment.cosmos.bech32Prefix.valPub,
					bech32PrefixConsAddr:
						environment.cosmos.bech32Prefix.consAddr,
					bech32PrefixConsPub:
						environment.cosmos.bech32Prefix.consPub,
				},
				currencies: [
					{
						coinDenom: environment.cosmos.coin.denom,
						coinMinimalDenom: environment.cosmos.coin.minimalDenom,
						coinDecimals: environment.cosmos.coin.decimals,
					},
				],
				feeCurrencies: [
					{
						coinDenom: environment.cosmos.coin.denom,
						coinMinimalDenom: environment.cosmos.coin.minimalDenom,
						coinDecimals: environment.cosmos.coin.decimals,
						gasPriceStep: {
							low: environment.cosmos.gasPrice.low,
							average: environment.cosmos.gasPrice.average,
							high: environment.cosmos.gasPrice.high,
						},
					},
				],
				stakeCurrency: {
					coinDenom: environment.cosmos.coin.denom,
					coinMinimalDenom: environment.cosmos.coin.minimalDenom,
					coinDecimals: environment.cosmos.coin.decimals,
				},
				features: [],
			});

			await keplr.enable(environment.cosmos.chainId);

			const key = await keplr.getKey(environment.cosmos.chainId);
			this.address.set(key.bech32Address);

			await this.refreshBalance();
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

	async send(): Promise<void> {
		this.error.set('');
		this.txHash.set('');

		const from = this.address().trim();
		const to = this.toAddress().trim();
		const amtMain = this.amount().trim();

		if (!from) {
			this.error.set('Connect Keplr first.');
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
			const keplr = (window as any)?.keplr as Keplr | undefined;
			if (!keplr) throw new Error('Keplr extension not found');

			// deps:
			// npm i @cosmjs/stargate @cosmjs/proto-signing
			const { SigningStargateClient, GasPrice } = await import(
				'@cosmjs/stargate'
			);

			const signer =
				typeof keplr.getOfflineSignerAuto === 'function'
					? keplr.getOfflineSignerAuto(environment.cosmos.chainId)
					: (window as any).getOfflineSigner?.(
							environment.cosmos.chainId,
						);

			if (!signer) throw new Error('Keplr signer not available');

			const gasPriceStr =
				environment.cosmos.defaultGasPriceString ??
				`${environment.cosmos.gasPrice.average}${environment.cosmos.coin.minimalDenom}`;

			const client = await SigningStargateClient.connectWithSigner(
				environment.cosmos.rpc,
				signer,
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
		} catch (e) {
			this.error.set(this.formatErr(e));
		} finally {
			this.isSending.set(false);
		}
	}

	private mainToMinimal(value: string): bigint {
		// accepts "1", "1.2", "0.000001" (decimals from config)
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
