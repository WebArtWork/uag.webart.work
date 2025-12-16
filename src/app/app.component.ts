import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { CosmosService } from './cosmos.service';

@Component({
	selector: 'app-root',
	imports: [],
	templateUrl: './app.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	readonly cosmos = inject(CosmosService);

	// expose signals for template convenience (same names as before)
	readonly isConnecting = this.cosmos.isConnecting;
	readonly isSending = this.cosmos.isSending;

	readonly address = this.cosmos.address;
	readonly uuag = this.cosmos.minimalBalance;

	readonly toAddress = this.cosmos.toAddress;
	readonly amountUag = this.cosmos.amount;
	readonly txHash = this.cosmos.txHash;

	readonly error = this.cosmos.error;

	readonly uag = this.cosmos.balance;

	// optional: simple "connected" flag
	readonly isConnected = computed(() => !!this.address());

	connectKeplr(): Promise<void> {
		return this.cosmos.connectKeplr();
	}

	refreshBalance(): Promise<void> {
		return this.cosmos.refreshBalance();
	}

	send(): Promise<void> {
		return this.cosmos.send();
	}
}
