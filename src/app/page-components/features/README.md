# ngx-page-features

Angular v20 standalone Features grid with signal inputs and BEM styles.

## Usage

```html
<page-features
	[items]="featureList"
	[minWidth]="220"
	[gap]="'var(--gutter)'"
	(featureClick)="onFeatureClick($event)"
></page-features>
```

```ts
import { FeatureItem } from './features.component';

featureList: FeatureItem[] = [
  { icon: 'bolt', title: 'Fast setup', desc: 'Drop-in blocks with consistent BEM.' },
  { icon: 'tune', title: 'Configurable', desc: 'Signals-based inputs keep it simple.' },
];
```

## Inputs (signals)

- `items = input<FeatureItem[]>(...)`
- `minWidth = input<number>(220)` – grid min column width, px.
- `gap = input<string>('var(--gutter)')` – CSS gap value.

### `FeatureItem`

- `icon: string` – material icon name
- `title: string`
- `desc?: string`

## Outputs

- `featureClick = output<{ index: number; item: FeatureItem }>()`

```

## Notes

- BEM block `.features`; elements: `__item`, `__icon`, `__title`, `__desc`.
- Uses CSS vars: `--gutter`, `--c-border`, `--c-bg-secondary`, `--c-text-secondary`, `--c-text-primary`.
- Change detection: OnPush.
```
