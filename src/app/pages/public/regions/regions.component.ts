import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { UserPreviewComponent } from 'src/app/modules/user/components/user-preview/user-preview.component';
import { UamapComponent } from 'src/app/page-components/uamap/uamap.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './regions.component.html',
	styleUrls: ['./regions.component.scss'],
	imports: [CommonModule, UserPreviewComponent, BurgerComponent, UamapComponent],
})
export class RegionsComponent implements OnInit {
	private _cdr = inject(ChangeDetectorRef);

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
}
