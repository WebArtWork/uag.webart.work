import { CommonModule } from '@angular/common';
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
import { UamapComponent } from 'src/app/page-components/uamap/uamap.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './regions.component.html',
	styleUrls: ['./regions.component.scss'],
	imports: [
		CommonModule,
		UserPreviewComponent,
		BurgerComponent,
		UamapComponent,
		DiiaComponent,
	],
})
export class RegionsComponent implements OnInit {
	private _cdr = inject(ChangeDetectorRef);

	private _router = inject(Router);

	isMenuOpen = signal(false);

	readonly regions: string[] = [
		'Cherkasy',
		'Chernihiv',
		'Chernivtsi',
		'Dnipropetrovsk',
		'Donetsk',
		'Ivano-Frankivsk',
		'Kharkiv',
		'Kherson',
		'Khmelnytskyi',
		'Kirovohrad',
		'Kyiv',
		'Kyiv City',
		'Luhansk',
		'Lviv',
		'Mykolaiv',
		'Odesa',
		'Poltava',
		'Rivne',
		'Sumy',
		'Ternopil',
		'Vinnytsia',
		'Volyn',
		'Zakarpattia',
		'Zaporizhzhia',
		'Zhytomyr',
		'Crimea',
	];

	ngOnInit() {
		this._cdr.detectChanges();
	}

	regionClick(id: string) {
		this._router.navigateByUrl('/region/' + id);
	}
}
