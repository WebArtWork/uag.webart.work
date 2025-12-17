export type WalletId = 'keplr';

export type WalletAccount = {
	address: string;
};

export type WalletConnectResult = {
	walletId: WalletId;
	account: WalletAccount;
};

export type WalletStatus =
	| 'disconnected'
	| 'connecting'
	| 'connected'
	| 'error';
