# ngx-page-filters

Angular v20 standalone Filters + Sort bar with signal inputs/outputs and BEM styles.

## Usage

```html
<page-filters
	[leftItems]="['All','New','Sale']"
	[leftPlaceholder]="'Select type...'"
	[sortItems]="['Popular','Price ↑','Price ↓']"
	[sortPlaceholder]="'Sort by...'"
	[justify]="'space-between'"
	(leftChange)="onLeftChange($event)"
	(sortChange)="onSortChange($event)"
></page-filters>
```

## Inputs (signals)

- `leftItems = input<string[]>(['All','New','Sale'])`
- `leftPlaceholder = input<string>('Select type...')`
- `sortItems = input<string[]>(['Popular','Price ↑','Price ↓'])`
- `sortPlaceholder = input<string>('Sort by...')`
- `justify = input<'space-between' | 'start' | 'center' | 'end'>('space-between')`

## Outputs

- `leftChange = output<string>()`
- `sortChange = output<string>()`

> Note: Template wires to `(valueChange)` from your `wselect`. If your API differs, update the event binding accordingly.

## Notes

- BEM block `.filters`; elements: `__left`, `__sort`, `__label`.
- Mobile stacks at ≤991px.
- Uses CSS vars: `--gutter`, `--c-text-primary`.
