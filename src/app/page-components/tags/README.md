# ngx-page-tags

Angular v20 standalone Tags (pill list) with signal inputs/outputs and BEM styles.

## Usage

```html
<page-tags
	[items]="['UI','Angular','PrimeNG','BEM','Responsive']"
	[gap]="'10px'"
	[align]="'left'"
	[size]="'md'"
	[clickable]="true"
	(tagClick)="onTag($event)"
></page-tags>
```

## Inputs (signals)

- `items = input<string[]>(...)`
- `gap = input<string>('10px')` – CSS gap for the list
- `align = input<'left' | 'center' | 'right'>('left')` – row alignment
- `size = input<'sm' | 'md'>('md')` – pill density
- `clickable = input<boolean>(false)` – toggles pointer + emits on click

## Outputs

- `tagClick = output<{ index: number; value: string }>()`

## Notes

- BEM block `.tags`; element `__item`; modifiers: `--sm`, `--center`, `--right`, `--clickable`.
- Uses CSS vars: `--c-bg-secondary`, `--c-border`, `--c-text-secondary`.
- Change detection: OnPush.
