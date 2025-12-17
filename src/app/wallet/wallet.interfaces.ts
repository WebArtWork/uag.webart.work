import { WalletConnectResult, WalletId } from './wallet.types';

export interface WalletAdapter {
	readonly id: WalletId;
	readonly title: string;

	isAvailable(): boolean;

	connect(): Promise<WalletConnectResult>;
	getSigner(): Promise<unknown>;
	disconnect(): Promise<void>;
}
