import { Injectable } from '@angular/core';
import { environment } from '@env';

type KeplrKey = { bech32Address: string };

type KeplrLike = {
	experimentalSuggestChain: (c: unknown) => Promise<void>;
	enable: (chainId: string) => Promise<void>;
	getKey: (chainId: string) => Promise<KeplrKey>;
	getOfflineSignerDirect?: (chainId: string) => unknown;
	getOfflineSignerAuto?: (chainId: string) => Promise<unknown> | unknown;
};

@Injectable({ providedIn: 'root' })
export class KeplrService {
	private get keplr(): KeplrLike | undefined {
		return (globalThis as any)?.keplr as KeplrLike | undefined;
	}

	isAvailable(): boolean {
		return !!this.keplr;
	}

	async connect(): Promise<string> {
		const keplr = this.keplr;
		if (!keplr) throw new Error('Keplr extension not found');

		await keplr.experimentalSuggestChain({
			chainId: environment.cosmos.chainId,
			chainName: environment.cosmos.chainName,
			rpc: environment.cosmos.rpc,
			rest: environment.cosmos.rest,
			bip44: { coinType: 118 },
			bech32Config: {
				bech32PrefixAccAddr: environment.cosmos.bech32Prefix.accAddr,
				bech32PrefixAccPub: environment.cosmos.bech32Prefix.accPub,
				bech32PrefixValAddr: environment.cosmos.bech32Prefix.valAddr,
				bech32PrefixValPub: environment.cosmos.bech32Prefix.valPub,
				bech32PrefixConsAddr: environment.cosmos.bech32Prefix.consAddr,
				bech32PrefixConsPub: environment.cosmos.bech32Prefix.consPub,
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
		return key.bech32Address;
	}

	async getSigner(): Promise<unknown> {
		const keplr = this.keplr;
		if (!keplr) throw new Error('Keplr extension not found');

		// ensure enabled (safe to call repeatedly)
		await keplr.enable(environment.cosmos.chainId);

		const signer =
			typeof keplr.getOfflineSignerDirect === 'function'
				? keplr.getOfflineSignerDirect(environment.cosmos.chainId)
				: typeof keplr.getOfflineSignerAuto === 'function'
					? await keplr.getOfflineSignerAuto(
							environment.cosmos.chainId,
						)
					: (globalThis as any).getOfflineSigner?.(
							environment.cosmos.chainId,
						);

		if (!signer || typeof (signer as any).getAccounts !== 'function') {
			throw new Error('Keplr signer not available');
		}

		return signer;
	}
}
