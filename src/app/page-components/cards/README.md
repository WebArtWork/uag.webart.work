# ngx-page-cards

Angular v20 standalone cards component using signal inputs and BEM styles.

## Usage

```html
<page-cards
	[items]="cards"
	[size]="'tiny'"
	[minWidth]="200"
	(cardClick)="onCardClick($event)"
></page-cards>
```

```ts
import { CardItem } from './cards.component';

cards: CardItem[] = [
  { title: 'First', description: 'Short description', imageUrl: 'assets/default.png' },
  { title: 'Second', description: 'Short description', imageUrl: 'assets/default.png' },
];
```

## Inputs (signals)

- `items = input<CardItem[]>(...)`
- `size = input<'tiny' | 'sm' | 'md'>('tiny')`
- `minWidth = input<number>(180)` – grid min column width, px (via CSS var `--cards-min`).

### `CardItem`

- `title: string`
- `description?: string`
- `imageUrl?: string`
- `imageAlt?: string`

## Outputs

- `cardClick = output<{ index: number; item: CardItem }>()` – when a card is clicked.

```

## Notes

- BEM block `.cards`; elements: `__item`, `__img`, `__title`, `__desc`; modifiers: `--tiny|--sm|--md`.
- Uses CSS vars: `--gutter`, `--c-border`, `--c-bg-secondary`, `--c-text-secondary`, `--c-text-primary`.
- Change detection: OnPush.
```
