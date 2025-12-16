# ngx-page-steps

Angular v20 standalone Steps / How-it-works block with signal inputs/outputs and BEM styles.

## Usage

```html
<page-steps
	[items]="[{title:'Discover',desc:'Explain...'},{title:'Build',desc:'Explain...'}]"
	[minWidth]="220"
	[align]="'left'"
	(stepClick)="onStep($event)"
></page-steps>
```

```ts
import { StepItem } from './steps.component';

steps: StepItem[] = [
  { num: 1, title: 'Discover', desc: 'Explain...' },
  { num: 2, title: 'Build', desc: 'Explain...' },
  { num: 3, title: 'Ship', desc: 'Explain...' },
];
```

## Inputs (signals)

- `items = input<StepItem[]>(...)`
- `minWidth = input<number>(200)` – grid min column width, px
- `align = input<'left' | 'center' | 'right'>('left')` – text alignment per card

### `StepItem`

- `num?: number` – optional manual index (defaults to auto `i+1`)
- `title: string`
- `desc?: string`

## Outputs

- `stepClick = output<{ index: number; item: StepItem }>()`

## Notes

- BEM block `.steps`; elements: `__item`, `__num`, `__title`, `__desc`; modifiers: `--center`, `--right`.
- Uses CSS vars: `--gutter`, `--c-primary`, `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
