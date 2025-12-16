# ngx-page-breadcrumb

Angular v20 standalone breadcrumb with signal-based inputs and BEM styles.

## Usage

```html
<page-breadcrumb
	[items]="crumbs"
	[separator]="'/'"
	[ariaLabel]="'Breadcrumb'"
	(crumbClick)="onCrumbClick($event)"
></page-breadcrumb>
```

```ts
import { Crumb } from './breadcrumb.component';

crumbs: Crumb[] = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  { label: 'Item' },
];
```

## Inputs (signals)

- `items = input<Crumb[]>(...)` – trail items (last item is current).
- `separator = input<string>('/')` – character/string between items.
- `ariaLabel = input<string>('Breadcrumb')` – nav landmark label.

### `Crumb`

- `label: string`
- `href?: string`
- `target?: string` (e.g., `_blank`)
- `rel?: string` (e.g., `noopener`)

## Outputs

- `crumbClick = output<{ index: number; item: Crumb }>()` – fires for non-last items (links).

```

## Notes

- BEM block: `.breadcrumb`, elements: `__link`, `__current`, `__sep`.
- Uses CSS vars: `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
```
