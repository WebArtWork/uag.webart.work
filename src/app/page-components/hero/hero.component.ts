import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ButtonComponent, ButtonType } from '@lib/button';

interface HeroButton {
	text: string;
	type?: ButtonType;
	click?: () => void;
	href?: () => void;
	routerLink?: () => void;
}

type MediaSide = 'left' | 'right';

@Component({
	selector: 'page-hero',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './hero.component.html',
	styleUrl: './hero.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
	// Texts
	title = input<string>('');
	description = input<string>('');

	// Buttons
	buttons = input<HeroButton[]>([]);

	// Media
	mediaUrl = input<string>('');
	mediaAlt = input<string>('Hero');
	mediaSide = input<MediaSide>('right'); // 'left' places media before text

	// Layout
	cols = input<string>('1.1fr 0.9fr'); // grid-template-columns

	// Outputs
	primaryClick = output<void>();
	secondaryClick = output<void>();
	mediaClick = output<void>();
}
