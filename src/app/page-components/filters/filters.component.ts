import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { SelectComponent } from 'src/app/libs/select/select.component';

@Component({
	selector: 'page-filters',
	standalone: true,
	imports: [CommonModule, SelectComponent],
	templateUrl: './filters.component.html',
	styleUrl: './filters.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
	/** Left filter select */
	leftItems = input<string[]>(['All', 'New', 'Sale']);
	leftPlaceholder = input<string>('Select type...');

	/** Sort select */
	sortItems = input<string[]>(['Popular', 'Price ↑', 'Price ↓']);
	sortPlaceholder = input<string>('Sort by...');

	/** Layout control */
	justify = input<'space-between' | 'start' | 'center' | 'end'>(
		'space-between',
	);

	/** Outputs (bubbled from inner selects). Adjust event binding in template to your SelectComponent API if needed. */
	leftChange = output<string>();
	sortChange = output<string>();
}
