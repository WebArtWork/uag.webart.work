import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	output,
} from '@angular/core';

type PageToken = number | '…';

@Component({
	selector: 'page-pagination',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
	/** Total items and page sizing */
	total = input<number>(60);
	pageSize = input<number>(10);

	/** 1-based current page */
	page = input<number>(1);

	/** How many sibling pages to show around the current page */
	siblingCount = input<number>(1);

	/** How many boundary pages to always show at the start & end */
	boundaryCount = input<number>(1);

	/** Show prev/next buttons */
	showPrevNext = input<boolean>(true);

	/** Labels and aria */
	prevLabel = input<string>('Prev');
	nextLabel = input<string>('Next');
	ariaLabel = input<string>('Pagination');

	/** Disable all interactions */
	disabled = input<boolean>(false);

	/** Emits when a new page is requested */
	pageChange = output<number>();

	/** Derived counts */
	totalPages = computed(() => {
		const t = Math.max(0, this.total());
		const ps = Math.max(1, this.pageSize());
		return Math.max(1, Math.ceil(t / ps));
	});

	/** Clamp page into 1..totalPages */
	current = computed(() => {
		const p = Math.max(1, Math.trunc(this.page() || 1));
		const max = this.totalPages();
		return Math.min(max, p);
	});

	/** The list of tokens to render (numbers and ellipses) */
	pageList = computed<PageToken[]>(() => {
		const count = this.totalPages();
		const current = this.current();
		const boundary = Math.max(0, this.boundaryCount());
		const sibling = Math.max(0, this.siblingCount());

		const range = (start: number, end: number): number[] =>
			Array.from(
				{ length: Math.max(0, end - start + 1) },
				(_, i) => start + i,
			);

		if (count <= 1) return [1];

		const startPages = range(1, Math.min(boundary, count));
		const endPages = range(
			Math.max(count - boundary + 1, boundary + 1),
			count,
		);

		const siblingsStart = Math.max(
			Math.min(current - sibling, count - boundary - sibling * 2 - 1),
			boundary + 2,
		);

		const siblingsEnd = Math.min(
			Math.max(current + sibling, boundary + sibling * 2 + 2),
			endPages.length > 0 ? endPages[0] - 2 : count - 1,
		);

		const items: PageToken[] = [];

		items.push(...startPages);

		if (siblingsStart > boundary + 2) {
			items.push('…');
		} else if (boundary + 1 < count - boundary) {
			items.push(boundary + 1);
		}

		items.push(...range(siblingsStart, siblingsEnd));

		if (siblingsEnd < (endPages.length ? endPages[0] - 2 : count - 1)) {
			items.push('…');
		} else if (endPages.length && endPages[0] > boundary + 1) {
			items.push(endPages[0] - 1);
		}

		items.push(...endPages);

		// Ensure uniqueness and valid bounds
		return items
			.filter((v, i, a) =>
				v === '…' ? i === 0 || a[i - 1] !== '…' : true,
			)
			.filter(
				(v) =>
					v === '…' ||
					(typeof v === 'number' && v >= 1 && v <= count),
			);
	});

	isActive(n: number) {
		return n === this.current();
	}

	isPrevDisabled() {
		return this.disabled() || this.current() <= 1;
	}

	isNextDisabled() {
		return this.disabled() || this.current() >= this.totalPages();
	}

	goTo(n: number) {
		if (this.disabled()) return;
		const target = Math.max(1, Math.min(this.totalPages(), Math.trunc(n)));
		if (target !== this.current()) {
			this.pageChange.emit(target);
		}
	}

	prev() {
		if (!this.isPrevDisabled()) this.goTo(this.current() - 1);
	}

	next() {
		if (!this.isNextDisabled()) this.goTo(this.current() + 1);
	}

	isNumber(v: PageToken): v is number {
		return typeof v === 'number';
	}
}
