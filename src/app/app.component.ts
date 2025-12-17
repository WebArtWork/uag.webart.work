import { HttpClient } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { CosmosService } from './cosmos.service';

@Component({
	selector: 'app-root',
	imports: [ButtonComponent],
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly cosmos = inject(CosmosService);

	readonly isConnecting = this.cosmos.isConnecting;
	readonly isSending = this.cosmos.isSending;

	readonly address = this.cosmos.address;
	readonly uuag = this.cosmos.minimalBalance;
	readonly uag = this.cosmos.balance;

	readonly toAddress = this.cosmos.toAddress;
	readonly amountUag = this.cosmos.amount;
	readonly txHash = this.cosmos.txHash;

	readonly isLoadingTxs = this.cosmos.isLoadingTxs;
	readonly txs = this.cosmos.txs;

	readonly error = this.cosmos.error;

	readonly isConnected = computed(() => !!this.address());

	connectKeplr(): Promise<void> {
		return this.cosmos.connectKeplr();
	}

	refreshBalance(): Promise<void> {
		return this.cosmos.refreshBalance();
	}

	refreshTransactions(): Promise<void> {
		return this.cosmos.refreshTransactions();
	}

	send(): Promise<void> {
		return this.cosmos.send();
	}

	http = inject(HttpClient);

	sign() {
		this.http.post('/api/diia/sign', {}).subscribe();
	}
}
