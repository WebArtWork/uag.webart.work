import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface GalleryItem {
	src: string;
	alt?: string;
	caption?: string;
	href?: string;
	target?: string;
	rel?: string;
}

@Component({
	selector: 'page-gallery',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './gallery.component.html',
	styleUrl: './gallery.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
	/** Items to render */
	items = input<GalleryItem[]>([
		{ src: 'assets/default.png', caption: 'Caption' },
		{ src: 'assets/default.png', caption: 'Caption' },
		{ src: 'assets/default.png', caption: 'Caption' },
		{ src: 'assets/default.png', caption: 'Caption' },
		{ src: 'assets/default.png', caption: 'Caption' },
		{ src: 'assets/default.png', caption: 'Caption' },
	]);

	/** Grid min column width (px) */
	minWidth = input<number>(180);

	/** Gap token (defaults to --gutter) */
	gap = input<string>('var(--gutter)');

	/** Show captions under images */
	showCaptions = input<boolean>(true);

	/** Emits when an image (or its link) is clicked */
	imageClick = output<{ index: number; item: GalleryItem }>();
}
