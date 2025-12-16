# ngx-page-stats

Angular v20 standalone stats grid with signal inputs and BEM styles.

## Usage

```html
<page-stats
	[items]="[{value:'24k+',label:'Users'},{value:'99.9%',label:'Uptime'}]"
	[minWidth]="160"
	[align]="'center'"
	[valueSize]="'md'"
	(itemClick)="onStatClick($event)"
></page-stats>
```

## Inputs (signals)

- `items = input<StatItem[]>(...)`
- `minWidth = input<number>(160)` – grid min column width in px.
- `align = input<'left' | 'center' | 'right'>('center')` – text alignment.
- `valueSize = input<'sm' | 'md' | 'lg'>('md')` – value font scale.

### `StatItem`

- `value: string | number`
- `label: string`

## Outputs

- `itemClick = output<{ index: number; item: StatItem }>()`

## Notes

- BEM block `.stats`; elements: `__item`, `__value`, `__label`; modifiers: `--left`, `--right`, `--sm`, `--lg`.
- Uses CSS vars: `--gutter`, `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
