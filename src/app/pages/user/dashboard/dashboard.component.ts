import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	computed,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { CosmosService } from 'src/app/cosmos.service';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { UserPreviewComponent } from 'src/app/modules/user/components/user-preview/user-preview.component';
import { HeroComponent } from 'src/app/page-components/hero/hero.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	imports: [UserPreviewComponent, BurgerComponent, HeroComponent],
})
export class DashboardComponent implements OnInit {
	private _cdr = inject(ChangeDetectorRef);

	isMenuOpen = signal(false);

	ngOnInit() {
		this._cdr.detectChanges();
	}

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
}
