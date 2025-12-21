import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	effect,
	input,
	output,
	viewChild,
} from '@angular/core';

export type UaMapRegionConfig = {
	color?: string; // region fill
	label?: string; // displayed label
	textColor?: string; // label color
};

export type UaMapRegionsInput = Record<string, UaMapRegionConfig>;

@Component({
	selector: 'uag-uamap',
	templateUrl: './uamap.component.html',
	styleUrl: './uamap.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UamapComponent implements AfterViewInit {
	// Inputs
	readonly regions = input<UaMapRegionsInput>({});
	readonly defaultColor = input<string>('#d8dee9');
	readonly defaultTextColor = input<string>('#111827');
	readonly showLabels = input<boolean>(true);
	readonly labelFontSize = input<number>(10);

	// Outputs
	readonly regionClick = output<string>();
	readonly regionHover = output<string | null>();

	// View
	protected readonly svgEl =
		viewChild.required<ElementRef<SVGSVGElement>>('svg');

	private isReady = false;

	constructor() {
		effect(() => {
			// re-apply whenever inputs change
			void this.regions();
			void this.defaultColor();
			void this.defaultTextColor();
			void this.showLabels();
			void this.labelFontSize();

			queueMicrotask(() => {
				this.applyRegionFills();
				this.renderLabels();
			});
		});
	}

	ngAfterViewInit(): void {
		this.isReady = true;

		this.attachRegionEvents();
	}

	private getSvg(): SVGSVGElement | null {
		return this.isReady ? this.svgEl().nativeElement : null;
	}

	private getRegionPaths(svg: SVGSVGElement): SVGPathElement[] {
		// expects each region path to have an id (e.g. UA01..UA27)
		return Array.from(svg.querySelectorAll('path[id]')) as SVGPathElement[];
	}

	private getRegionIdFromTarget(target: EventTarget | null): string | null {
		if (!(target instanceof Element)) return null;
		const path = target.closest('path[id]');
		return path?.getAttribute('id') ?? null;
	}

	protected handleRegionPointerOver(event: PointerEvent): void {
		const id = this.getRegionIdFromTarget(event.target);
		if (!id) return;

		this.regionHover.emit(id);
	}

	protected handleRegionPointerOut(event: PointerEvent): void {
		const fromId = this.getRegionIdFromTarget(event.target);
		if (!fromId) return;

		const toId = this.getRegionIdFromTarget(event.relatedTarget);
		if (fromId === toId) return;

		this.regionHover.emit(null);
	}

	protected handleRegionClick(event: MouseEvent): void {
		const id = this.getRegionIdFromTarget(event.target);
		if (!id) return;

		event.preventDefault();
		event.stopPropagation();
		this.regionClick.emit(id);
	}

	private attachRegionEvents(): void {
		const svg = this.getSvg();
		if (!svg) return;

		for (const path of this.getRegionPaths(svg)) {
			path.classList.add('ua-map__region');
		}
	}

	private applyRegionFills(): void {
		const svg = this.getSvg();
		if (!svg) return;

		const cfg = this.regions();
		const fallback = this.defaultColor();

		for (const path of this.getRegionPaths(svg)) {
			const id = path.getAttribute('id') ?? '';
			const fill = cfg[id]?.color ?? fallback;
			path.setAttribute('fill', fill);
		}
	}

	private ensureLabelsLayer(svg: SVGSVGElement): SVGGElement {
		let layer = svg.querySelector('#ua-map-labels') as SVGGElement | null;
		if (layer) return layer;

		layer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
		layer.setAttribute('id', 'ua-map-labels');
		svg.appendChild(layer);
		return layer;
	}

	private renderLabels(): void {
		const svg = this.getSvg();
		if (!svg) return;

		const layer = this.ensureLabelsLayer(svg);

		// clear
		while (layer.firstChild) layer.removeChild(layer.firstChild);

		if (!this.showLabels()) return;

		const cfg = this.regions();
		const fallbackText = this.defaultTextColor();
		const fontSize = this.labelFontSize();

		for (const path of this.getRegionPaths(svg)) {
			const id = path.getAttribute('id') ?? '';
			const name = path.getAttribute('name') ?? '';
			const label = cfg[id]?.label ?? name;

			if (!label) continue;

			let cx = 0;
			let cy = 0;

			try {
				const bb = path.getBBox();
				cx = bb.x + bb.width / 2;
				cy = bb.y + bb.height / 2;
			} catch {
				// some SVGs can throw if not rendered yet
				continue;
			}

			const text = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'text',
			);
			text.setAttribute('x', String(cx));
			text.setAttribute('y', String(cy));
			text.setAttribute('text-anchor', 'middle');
			text.setAttribute('dominant-baseline', 'middle');
			text.setAttribute('class', 'ua-map__label');
			text.setAttribute('data-region-id', id);
			text.setAttribute('font-size', String(fontSize));
			text.setAttribute('fill', cfg[id]?.textColor ?? fallbackText);

			text.textContent = label;

			layer.appendChild(text);
		}
	}
}
