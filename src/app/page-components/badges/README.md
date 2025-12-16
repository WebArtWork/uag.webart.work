# ngx-page-badges

Angular v20 standalone component with signal-based Inputs/Outputs and BEM styles.

## Usage

```html
<page-badges
	[items]="badges"
	[size]="'md'"
	[wrap]="true"
	(badgeClick)="onBadgeClick($event)"
	(removed)="onBadgeRemoved($event)"
></page-badges>
```

```ts
import { BadgeItem } from './badges.component';

badges: BadgeItem[] = [
  { text: 'New', variant: 'info' },
  { text: 'Beta', variant: 'warn', removable: true },
  { text: 'Featured', variant: 'success' },
];
```

## Inputs (signals)

- `items = input<BadgeItem[]>(...)`
- `size = input<'sm' | 'md' | 'lg'>('md')`
- `wrap = input<boolean>(true)`

### `BadgeItem`

- `text: string`
- `variant?: 'neutral' | 'info' | 'success' | 'warn' | 'error'`
- `removable?: boolean`

## Outputs (signal emitters)

- `badgeClick = output<{ index: number; item: BadgeItem }>()`
- `removed = output<number>()` – index of the removed badge.

```

## Notes

- BEM block: `.badges`, element: `__item`, modifiers: `--{variant}`.
- Size modifiers: `.badges--sm` / default / `.badges--lg`.
- Uses CSS vars: `--c-border`, `--c-bg-secondary`, `--c-text-secondary`.
- Change detection: OnPush.
```
