import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from '@angular/core';

@Component({
	selector: 'wbutton-styles',
	template: '',
	styleUrls: ['./button.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonStylesComponent {}
