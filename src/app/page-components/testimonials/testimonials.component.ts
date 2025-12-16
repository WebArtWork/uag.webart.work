import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface TestimonialItem {
	quote: string;
	author: string;
	title?: string; // role or company
	avatarUrl?: string; // optional avatar
	alt?: string; // avatar alt
}

type Align = 'left' | 'center' | 'right';

@Component({
	selector: 'page-testimonials',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './testimonials.component.html',
	styleUrl: './testimonials.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
	/** Testimonials to render */
	items = input<TestimonialItem[]>([
		{
			quote: '“This layout saved us weeks.”',
			author: 'Jane Doe',
			title: 'Product Lead',
		},
		{
			quote: '“Clean BEM styles made reuse easy.”',
			author: 'Alex Kim',
			title: 'Frontend Eng',
		},
		{
			quote: '“Signals-based inputs are 💯.”',
			author: 'Priya Rao',
			title: 'Tech Lead',
		},
	]);

	/** Grid min column width (px) */
	minWidth = input<number>(260);

	/** Alignment of text inside the card */
	align = input<Align>('left');

	/** Show avatar if provided */
	showAvatar = input<boolean>(true);

	/** Emits when a testimonial card is clicked */
	itemClick = output<{ index: number; item: TestimonialItem }>();
}
