# ngx-page-table

Angular v20 standalone table with signal inputs/outputs and BEM styles.

## Usage

```html
<page-table
	[columns]="cols"
	[rows]="data"
	[size]="'md'"
	[zebra]="true"
	[stickyHeader]="true"
	[maxHeight]="'360px'"
	(rowClick)="onRow($event)"
	(cellClick)="onCell($event)"
></page-table>
```

```ts
import { TableColumn, TableRow } from './table.component';

cols: TableColumn[] = [
  { key: 'plan', label: 'Plan' },
  { key: 'users', label: 'Users', align: 'right' },
  { key: 'storage', label: 'Storage' },
  { key: 'price', label: 'Price' },
];

data: TableRow[] = [
  { plan: 'Starter', users: 3, storage: '5 GB', price: '$0' },
  { plan: 'Pro', users: 10, storage: '100 GB', price: '$19' },
];
```

## Inputs (signals)

- `columns = input<TableColumn[]>(...)`
- `rows = input<TableRow[]>(...)`
- `size = input<'sm' | 'md'>('md')`
- `zebra = input<boolean>(false)`
- `stickyHeader = input<boolean>(false)`
- `maxHeight = input<string>('')` – e.g. `'360px'` enables scroll + sticky head

### `TableColumn`

- `key: string` – property key in each row
- `label: string` – header text
- `align?: 'left' | 'center' | 'right'` – optional per-column text alignment

### `TableRow`

- `Record<string, any>` – keys should match your columns

## Outputs

- `rowClick = output<{ index: number; row: TableRow }>()`
- `cellClick = output<{ rowIndex: number; col: TableColumn; value: any }>()`

## Notes

- BEM block `.table`; elements: `__scroll`, `__inner`, `__head`, `__body`, `__row`, `__cell`.
- Modifiers: `--sm`, `--zebra`; sticky header via `__scroll--sticky`.
- Uses CSS vars: `--c-border`, `--c-bg-secondary`, `--c-bg-tertiary`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
