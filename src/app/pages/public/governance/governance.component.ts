import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { UserPreviewComponent } from 'src/app/modules/user/components/user-preview/user-preview.component';
import { DiiaComponent } from 'src/app/page-components/diia/diia.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './governance.component.html',
	styleUrls: ['./governance.component.scss'],
	imports: [UserPreviewComponent, BurgerComponent, DiiaComponent],
})
export class GovernanceComponent implements OnInit {
	private _cdr = inject(ChangeDetectorRef);

	isMenuOpen = signal(false);

	ngOnInit() {
		this._cdr.detectChanges();
	}
}
