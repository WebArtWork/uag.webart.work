import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface StatItem {
	value: string | number;
	label: string;
}

type Align = 'left' | 'center' | 'right';
type ValueSize = 'sm' | 'md' | 'lg';

@Component({
	selector: 'page-stats',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './stats.component.html',
	styleUrl: './stats.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsComponent {
	/** Stats to render */
	items = input<StatItem[]>([
		{ value: '24k+', label: 'Users' },
		{ value: '99.9%', label: 'Uptime' },
		{ value: '3x', label: 'Faster' },
	]);

	/** Grid min column width (px) */
	minWidth = input<number>(160);

	/** Text alignment for each card */
	align = input<Align>('center');

	/** Value font-size scale */
	valueSize = input<ValueSize>('md');

	/** Emit on item click */
	itemClick = output<{ index: number; item: StatItem }>();
}
