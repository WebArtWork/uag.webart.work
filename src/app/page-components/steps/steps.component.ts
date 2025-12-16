import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface StepItem {
	num?: number;
	title: string;
	desc?: string;
}

type Align = 'left' | 'center' | 'right';

@Component({
	selector: 'page-steps',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './steps.component.html',
	styleUrl: './steps.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsComponent {
	/** Steps to render */
	items = input<StepItem[]>([
		{ title: 'Step 1', desc: 'Explain the action for this step.' },
		{ title: 'Step 2', desc: 'Explain the action for this step.' },
		{ title: 'Step 3', desc: 'Explain the action for this step.' },
	]);

	/** Grid min column width (px) */
	minWidth = input<number>(200);

	/** Text alignment inside each card */
	align = input<Align>('left');

	/** Emits when a step is clicked */
	stepClick = output<{ index: number; item: StepItem }>();

	displayNum(i: number, s: StepItem) {
		return s.num ?? i + 1;
	}
}
