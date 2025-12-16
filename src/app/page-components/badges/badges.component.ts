import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warn' | 'error';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeItem {
	text: string;
	variant?: BadgeVariant;
	removable?: boolean;
}

@Component({
	selector: 'page-badges',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './badges.component.html',
	styleUrl: './badges.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgesComponent {
	/** Items to render */
	items = input<BadgeItem[]>([
		{ text: 'New', variant: 'neutral' },
		{ text: 'Beta', variant: 'neutral' },
		{ text: 'Featured', variant: 'neutral' },
	]);

	/** Size of badges */
	size = input<BadgeSize>('md');

	/** Wrap badges to multiple lines (true) or force single line (false) */
	wrap = input<boolean>(true);

	/** Emitted when a badge is clicked */
	badgeClick = output<{ index: number; item: BadgeItem }>();

	/** Emitted when a removable badge's close button is pressed */
	removed = output<number>();

	onRemove(index: number, ev: MouseEvent) {
		ev.stopPropagation();
		this.removed.emit(index);
	}
}
