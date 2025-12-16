import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface CardItem {
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
}

@Component({
	selector: 'page-cards',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './cards.component.html',
	styleUrl: './cards.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
	/** Card items to render */
	items = input<CardItem[]>([
		{
			title: 'Card title…',
			description: 'Short descriptive text.',
			imageUrl: 'assets/default.png',
			imageAlt: 'Card',
		},
		{
			title: 'Card title…',
			description: 'Short descriptive text.',
			imageUrl: 'assets/default.png',
			imageAlt: 'Card',
		},
		{
			title: 'Card title…',
			description: 'Short descriptive text.',
			imageUrl: 'assets/default.png',
			imageAlt: 'Card',
		},
		{
			title: 'Card title…',
			description: 'Short descriptive text.',
			imageUrl: 'assets/default.png',
			imageAlt: 'Card',
		},
		{
			title: 'Card title…',
			description: 'Short descriptive text.',
			imageUrl: 'assets/default.png',
			imageAlt: 'Card',
		},
	]);

	/** Size modifiers for image/thumb padding etc. */
	size = input<'tiny' | 'sm' | 'md'>('tiny');

	/** Minimum column width for grid (px) */
	minWidth = input<number>(180);

	/** Emits when a card is clicked */
	cardClick = output<{ index: number; item: CardItem }>();
}
