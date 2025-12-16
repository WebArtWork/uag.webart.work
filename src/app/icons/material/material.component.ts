import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateDirective } from '@module/translate';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLinkActive, RouterLink, TranslateDirective],
	selector: 'material-icon',
	templateUrl: './material.component.html',
	styleUrl: './material.component.scss',
})
export class MaterialComponent {
	routerLink = input('');

	icon = input('home');

	name = input('');
}
