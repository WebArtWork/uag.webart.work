import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
	signal,
} from '@angular/core';

export interface FaqItem {
	q: string;
	a: string;
}

@Component({
	selector: 'page-faq',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './faq.component.html',
	styleUrl: './faq.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
	/** FAQ list */
	items = input<FaqItem[]>([
		{
			q: 'What is included?',
			a: 'Everything you need to ship pages fast.',
		},
		{
			q: 'Is it customizable?',
			a: 'Yes, components are modular and themeable.',
		},
		{
			q: 'Can I use it in commercial projects?',
			a: 'Yes, licensed under MIT.',
		},
	]);

	/** When true, only one question can be open at a time (accordion behavior) */
	singleOpen = input<boolean>(false);

	/** Track open indices */
	private _open = signal<Set<number>>(new Set());

	/** Emits whenever a question is toggled */
	toggled = output<{ index: number; open: boolean }>();

	isOpen(i: number): boolean {
		return this._open().has(i);
	}

	toggle(i: number) {
		const next = new Set(this._open());
		const willOpen = !next.has(i);

		if (this.singleOpen()) {
			next.clear();
			if (willOpen) next.add(i);
		} else {
			if (willOpen) next.add(i);
			else next.delete(i);
		}

		this._open.set(next);
		this.toggled.emit({ index: i, open: willOpen });
	}
}
