import { Injectable, computed, signal } from '@angular/core';
import { KeplrWalletAdapter } from './wallet-keplr.adapter';
import { WalletAdapter } from './wallet.interfaces';
import type {
	WalletConnectResult,
	WalletId,
	WalletStatus,
} from './wallet.types';

const STORAGE_KEY = 'wallet:last';

@Injectable({ providedIn: 'root' })
export class WalletService {
	private readonly adapters: WalletAdapter[];

	readonly status = signal<WalletStatus>('disconnected');
	readonly walletId = signal<WalletId | ''>('');
	readonly address = signal<string>('');
	readonly error = signal<string>('');

	readonly isConnected = computed(
		() => this.status() === 'connected' && !!this.address(),
	);

	constructor(keplrAdapter: KeplrWalletAdapter) {
		this.adapters = [keplrAdapter];
	}

	getAvailableWallets(): Array<{ id: WalletId; title: string }> {
		return this.adapters
			.filter((a) => a.isAvailable())
			.map((a) => ({ id: a.id, title: a.title }));
	}

	async connect(id: WalletId = this.getDefaultWalletId()): Promise<void> {
		this.error.set('');
		this.status.set('connecting');

		try {
			const adapter = this.getAdapter(id);
			const res: WalletConnectResult = await adapter.connect();

			this.walletId.set(res.walletId);
			this.address.set(res.account.address);
			this.status.set('connected');

			this.saveLastWallet(res.walletId);
		} catch (e) {
			this.status.set('error');
			this.error.set(this.formatErr(e));
			this.walletId.set('');
			this.address.set('');
		}
	}

	async disconnect(): Promise<void> {
		this.error.set('');

		try {
			const id = this.walletId();
			if (id) await this.getAdapter(id).disconnect();
		} finally {
			this.status.set('disconnected');
			this.walletId.set('');
			this.address.set('');
		}
	}

	async getSigner(): Promise<unknown> {
		const id = this.walletId();
		if (!id) throw new Error('Wallet not connected');
		return this.getAdapter(id).getSigner();
	}

	private getAdapter(id: WalletId): WalletAdapter {
		const adapter = this.adapters.find((a) => a.id === id);
		if (!adapter) throw new Error(`Wallet adapter not found: ${id}`);
		if (!adapter.isAvailable())
			throw new Error(`${adapter.title} is not available`);
		return adapter;
	}

	private getDefaultWalletId(): WalletId {
		const last = this.loadLastWallet();
		if (last && this.adapters.some((a) => a.id === last && a.isAvailable()))
			return last;

		const first = this.adapters.find((a) => a.isAvailable());
		if (!first) throw new Error('No supported wallet found');
		return first.id;
	}

	private saveLastWallet(id: WalletId): void {
		try {
			localStorage.setItem(STORAGE_KEY, id);
		} catch {
			// ignore (SSR/private mode)
		}
	}

	private loadLastWallet(): WalletId | null {
		try {
			return (
				(localStorage.getItem(STORAGE_KEY) as WalletId | null) ?? null
			);
		} catch {
			return null;
		}
	}

	private formatErr(e: unknown): string {
		if (e instanceof Error) return e.message;
		return typeof e === 'string' ? e : JSON.stringify(e);
	}
}
