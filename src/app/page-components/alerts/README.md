# ngx-page-alerts

Angular v20 standalone component with signal-based Inputs/Outputs and BEM styles.

## Install

Copy the `alerts` folder into `src/app/page-components/` (or a library).

## Usage

```html
<page-alerts
	[items]="alerts"
	[layout]="'stack'"
	[role]="'status'"
	[dismissible]="true"
	(closed)="onClosed($event)"
	(itemClick)="onItemClick($event)"
></page-alerts>
```

```ts
import { AlertItem } from './alerts.component';

alerts: AlertItem[] = [
  { text: 'Saved.', type: 'success', closable: true },
  { text: 'Near limit.', type: 'warn' },
];
```

## Inputs (signals)

- `items = input<AlertItem[]>(...)`
- `layout = input<'stack' | 'inline'>('stack')`
- `role = input<'status' | 'alert'>('status')`
- `dismissible = input<boolean>(false)`

### `AlertItem`

- `text: string`
- `type: 'info' | 'success' | 'warn' | 'error'`
- `closable?: boolean`

## Outputs (signal emitters)

- `closed = output<number>()` – emits the closed alert index.
- `itemClick = output<{ index: number; item: AlertItem }>()` – emits when an alert is clicked.

```

## Notes

- BEM block: `.alerts`, elements `__item`, modifier `--{type}`.
- Uses CSS vars: `--c-border`, `--c-bg-secondary`.
- Change detection: OnPush.
```
