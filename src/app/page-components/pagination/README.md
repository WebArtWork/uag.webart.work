# ngx-page-pagination

Angular v20 standalone pagination with signal inputs and BEM styles.

## Usage

```html
<page-pagination
	[total]="240"
	[pageSize]="10"
	[page]="1"
	[siblingCount]="1"
	[boundaryCount]="1"
	[showPrevNext]="true"
	(pageChange)="onPageChange($event)"
></page-pagination>
```

## Inputs (signals)

- `total = input<number>(60)` – total items
- `pageSize = input<number>(10)` – items per page
- `page = input<number>(1)` – current page (1-based)
- `siblingCount = input<number>(1)` – neighbors around current
- `boundaryCount = input<number>(1)` – start/end pages always visible
- `showPrevNext = input<boolean>(true)` – show prev/next buttons
- `prevLabel = input<string>('Prev')`
- `nextLabel = input<string>('Next')`
- `ariaLabel = input<string>('Pagination')`
- `disabled = input<boolean>(false)`

## Outputs

- `pageChange = output<number>()` – emits the target page

## Notes

- BEM block `.pagination`; elements `__page`, `__ellipsis`; modifiers `__page--active`, `__page--disabled`.
- Uses CSS vars from your theme: `--c-border`, `--c-bg-secondary`, `--c-white`, `--c-primary`.
- Change detection: OnPush.
