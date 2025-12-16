import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

type Align = 'left' | 'center' | 'right';
type Size = 'sm' | 'md';

@Component({
	selector: 'page-tags',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tags.component.html',
	styleUrl: './tags.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {
	/** Tags to render */
	items = input<string[]>(['UI', 'Angular', 'PrimeNG', 'BEM', 'Responsive']);

	/** Layout/appearance */
	gap = input<string>('10px'); // CSS gap value
	align = input<Align>('left'); // container alignment
	size = input<Size>('md'); // pill size

	/** Clickability */
	clickable = input<boolean>(false);

	/** Emits when a tag is clicked */
	tagClick = output<{ index: number; value: string }>();
}
