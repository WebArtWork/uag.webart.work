import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface Crumb {
	label: string;
	href?: string;
	target?: string;
	rel?: string;
}

@Component({
	selector: 'page-breadcrumb',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
	/** Breadcrumb trail */
	items = input<Crumb[]>([
		{ label: 'Home', href: '/' },
		{ label: 'Catalog', href: '/catalog' },
		{ label: 'Item' },
	]);

	/** Separator string between items */
	separator = input<string>('/');

	/** ARIA label for the nav landmark */
	ariaLabel = input<string>('Breadcrumb');

	/** Emits when a crumb is clicked (index & item) */
	crumbClick = output<{ index: number; item: Crumb }>();
}
