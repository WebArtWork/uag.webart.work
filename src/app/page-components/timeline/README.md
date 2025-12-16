# ngx-page-timeline

Angular v20 standalone vertical timeline with signal inputs/outputs and BEM styles.

## Usage

```html
<page-timeline
	[items]="events"
	[size]="'md'"
	[showLine]="true"
	[lineColor]="'var(--c-border)'"
	[dotColor]="'var(--c-primary)'"
	(eventClick)="onEvent($event)"
></page-timeline>
```

```ts
import { TimelineEvent } from './timeline.component';

events: TimelineEvent[] = [
  { title: 'Launched v1', meta: 'Apr 2025', desc: 'Initial public release.' },
  { title: 'Added e-commerce blocks', meta: 'Jun 2025', desc: 'Products, pricing, and checkout UI.' },
];
```

## Inputs (signals)

- `items = input<TimelineEvent[]>(...)`
- `size = input<'sm' | 'md'>('md')` – density
- `showLine = input<boolean>(true)` – toggles vertical connector
- `lineColor = input<string>('var(--c-border)')`
- `dotColor = input<string>('var(--c-primary)')`

### `TimelineEvent`

- `title: string`
- `meta?: string`
- `desc?: string`
- `dotColor?: string` – per-event override

## Outputs

- `eventClick = output<{ index: number; item: TimelineEvent }>()`

## Notes

- BEM block `.timeline`; elements: `__event`, `__dot`, `__body`, `__title`, `__meta`, `__desc`; modifiers: `--sm`, `--no-line`.
- Uses CSS vars: `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`, `--c-primary`.
- Change detection: OnPush.
