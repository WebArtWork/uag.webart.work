import { Injectable } from '@angular/core';
import { KeplrService } from '../keplr.service';
import { WalletAdapter } from './wallet.interfaces';
import type { WalletConnectResult } from './wallet.types';

@Injectable({ providedIn: 'root' })
export class KeplrWalletAdapter implements WalletAdapter {
	readonly id = 'keplr' as const;
	readonly title = 'Keplr';

	constructor(private readonly keplr: KeplrService) {}

	isAvailable(): boolean {
		return this.keplr.isAvailable();
	}

	async connect(): Promise<WalletConnectResult> {
		const address = await this.keplr.connect();
		return { walletId: this.id, account: { address } };
	}

	getSigner(): Promise<unknown> {
		return this.keplr.getSigner();
	}

	async disconnect(): Promise<void> {
		// Keplr has no real disconnect. Keep for symmetry with other wallets.
	}
}
