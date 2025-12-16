# ngx-page-products

Angular v20 standalone product grid with signal inputs/outputs and BEM styles.

## Usage

```html
<page-products
	[items]="products"
	[minWidth]="260"
	[primaryType]="'primary'"
	[secondaryType]="'info'"
	[showSecondary]="true"
	(primaryClick)="onAdd($event)"
	(secondaryClick)="onDetails($event)"
	(imageClick)="onImage($event)"
></page-products>
```

```ts
import { ProductItem } from './products.component';

products: ProductItem[] = [
  {
    title: 'Product name',
    description: 'Short product description goes here…',
    imageUrl: 'assets/logo.png',
    price: { current: '$19.99', old: '$29.99', note: 'incl. VAT' },
    primaryText: 'Add to cart',
    secondaryText: 'Details'
  }
];
```

## Inputs (signals)

- `items = input<ProductItem[]>(...)`
- `minWidth = input<number>(260)` – grid min column width, px
- `primaryType = input<'primary' | 'info' | 'success' | 'warn' | 'danger' | 'secondary'>('primary')`
- `secondaryType = input<'primary' | 'info' | 'success' | 'warn' | 'danger' | 'secondary'>('info')`
- `showSecondary = input<boolean>(true)`

### `ProductItem`

- `title: string`
- `description?: string`
- `imageUrl?: string`
- `imageAlt?: string`
- `price: { current: string|number; old?: string|number; note?: string }`
- `primaryText?: string`
- `secondaryText?: string`

## Outputs

- `primaryClick = output<{ index: number; item: ProductItem }>()` – "Add to cart"
- `secondaryClick = output<{ index: number; item: ProductItem }>()` – "Details"
- `imageClick = output<{ index: number; item: ProductItem }>()` – image/thumbnail click

```

## Notes

- BEM block `.products`; elements: `__item`, `__img`, `__title`, `__desc`, `__price(+ parts)`, `__actions`.
- Uses CSS vars: `--gutter`, `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
```
