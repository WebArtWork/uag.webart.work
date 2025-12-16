import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	input,
	output,
	signal,
} from '@angular/core';

export interface TabItem {
	label: string;
	content?: string;
	disabled?: boolean;
	id?: string;
}

@Component({
	selector: 'page-tabs',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './tabs.component.html',
	styleUrl: './tabs.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
	/** Tabs to render */
	items = input<TabItem[]>([
		{ label: 'Overview', content: 'Overview content…' },
		{ label: 'Details', content: 'Details content…' },
		{ label: 'Reviews', content: 'Reviews content…' },
	]);

	/** Controlled active index (0-based) */
	index = input<number>(0);

	/** Stretch nav buttons to fill row */
	stretch = input<boolean>(false);

	/** Emits when active index changes */
	indexChange = output<number>();

	/** Emits when a tab button is clicked */
	tabClick = output<{ index: number; item: TabItem }>();

	/** Internal focus index for keyboard nav */
	private _focusIndex = signal<number>(0);

	/** Clamp active index to valid range */
	active = computed(() => {
		const n = Math.max(0, Math.trunc(this.index() || 0));
		const max = Math.max(0, this.items().length - 1);
		return Math.min(max, n);
	});

	constructor() {
		// Keep focus index in sync with active when inputs change
		effect(() => {
			this._focusIndex.set(this.active());
		});
	}

	isActive(i: number) {
		return i === this.active();
	}
	isDisabled(i: number) {
		return !!this.items()[i]?.disabled;
	}

	select(i: number) {
		if (this.isDisabled(i)) return;
		if (i !== this.active()) this.indexChange.emit(i);
	}

	onKeydown(e: KeyboardEvent) {
		const len = this.items().length;
		if (!len) return;
		const key = e.key;
		let next = this._focusIndex();
		if (key === 'ArrowRight') {
			next = (next + 1) % len;
			e.preventDefault();
		}
		if (key === 'ArrowLeft') {
			next = (next - 1 + len) % len;
			e.preventDefault();
		}
		if (key === 'Home') {
			next = 0;
			e.preventDefault();
		}
		if (key === 'End') {
			next = len - 1;
			e.preventDefault();
		}

		// Skip disabled tabs when navigating
		const start = next;
		while (this.items()[next]?.disabled) {
			next = (next + 1) % len;
			if (next === start) break;
		}

		if (next !== this._focusIndex()) this._focusIndex.set(next);
		if (key === 'Enter' || key === ' ') {
			e.preventDefault();
			this.select(this._focusIndex());
		}
	}

	tabId(i: number) {
		return this.items()[i]?.id || `tab-${i}`;
	}
	panelId(i: number) {
		return `panel-${this.tabId(i)}`;
	}
}
