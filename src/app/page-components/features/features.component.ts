import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface FeatureItem {
	icon: string; // material icon name
	title: string;
	desc?: string;
}

@Component({
	selector: 'page-features',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './features.component.html',
	styleUrl: './features.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesComponent {
	/** Features to render */
	items = input<FeatureItem[]>([
		{
			icon: 'bolt',
			title: 'Fast setup',
			desc: 'Drop-in blocks with consistent BEM.',
		},
		{
			icon: 'tune',
			title: 'Configurable',
			desc: 'Signals-based inputs keep it simple.',
		},
		{
			icon: 'layers',
			title: 'Composable',
			desc: 'Standalone Angular components.',
		},
		{
			icon: 'lock',
			title: 'MIT licensed',
			desc: 'Use freely in commercial projects.',
		},
	]);

	/** Grid min column width (px) */
	minWidth = input<number>(220);

	/** Gap token (fallbacks to --gutter) */
	gap = input<string>('var(--gutter)');

	/** Emit when a feature is clicked */
	featureClick = output<{ index: number; item: FeatureItem }>();
}
