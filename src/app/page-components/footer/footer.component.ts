import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface FooterLink {
	label: string;
	href?: string;
	target?: string;
	rel?: string;
}

@Component({
	selector: 'page-footer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	/** Left copyright / note */
	leftText = input<string>('© 2025 Web Art Work');

	/** Right side links */
	links = input<FooterLink[]>([
		{ label: 'Terms', href: '#' },
		{ label: 'Privacy', href: '#' },
		{ label: 'Contact', href: '#' },
	]);

	/** Layout alignment of the footer row */
	justify = input<'space-between' | 'start' | 'center' | 'end'>(
		'space-between',
	);

	/** ARIA label for the footer landmark */
	ariaLabel = input<string>('Local footer');

	/** Emitted when a link is clicked */
	linkClick = output<{ index: number; item: FooterLink }>();
}
