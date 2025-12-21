import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { UserPreviewComponent } from 'src/app/modules/user/components/user-preview/user-preview.component';
import { DiiaComponent } from 'src/app/page-components/diia/diia.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './region.component.html',
	styleUrls: ['./region.component.scss'],
	imports: [UserPreviewComponent, BurgerComponent, DiiaComponent],
})
export class RegionComponent implements OnInit {
	private _cdr = inject(ChangeDetectorRef);

	private _router = inject(Router);

	region = this._router.url.replace('/region/', '');

	isMenuOpen = signal(false);

	ngOnInit() {
		this._cdr.detectChanges();
	}
}
