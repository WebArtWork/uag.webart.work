import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface TimelineEvent {
	title: string;
	meta?: string; // date or small note
	desc?: string;
	dotColor?: string; // CSS color (overrides default)
}

type Size = 'sm' | 'md';

@Component({
	selector: 'page-timeline',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './timeline.component.html',
	styleUrl: './timeline.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
	/** Events to render (top to bottom) */
	items = input<TimelineEvent[]>([
		{
			title: 'Launched v1',
			meta: 'Apr 2025',
			desc: 'Initial public release.',
		},
		{
			title: 'Added e-commerce blocks',
			meta: 'Jun 2025',
			desc: 'Products, pricing, and checkout UI.',
		},
	]);

	/** Visual options */
	size = input<Size>('md'); // card density
	showLine = input<boolean>(true); // show the vertical connector line
	lineColor = input<string>('var(--c-border)');
	dotColor = input<string>('var(--c-primary)');

	/** Emits on event click */
	eventClick = output<{ index: number; item: TimelineEvent }>();
}
