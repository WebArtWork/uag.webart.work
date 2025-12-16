# ngx-page-gallery

Angular v20 standalone Gallery grid with signal inputs and BEM styles.

## Usage

```html
<page-gallery
	[items]="photos"
	[minWidth]="180"
	[gap]="'var(--gutter)'"
	[showCaptions]="true"
	(imageClick)="onImgClick($event)"
></page-gallery>
```

```ts
import { GalleryItem } from './gallery.component';

photos: GalleryItem[] = [
  { src: 'assets/default.png', caption: 'One' },
  { src: 'assets/default.png', caption: 'Two', href: 'https://example.com' },
];
```

## Inputs (signals)

- `items = input<GalleryItem[]>(...)`
- `minWidth = input<number>(180)` – grid min column width, px
- `gap = input<string>('var(--gutter)')` – CSS gap value
- `showCaptions = input<boolean>(true)`

### `GalleryItem`

- `src: string`
- `alt?: string`
- `caption?: string`
- `href?: string`
- `target?: string`
- `rel?: string`

## Outputs

- `imageClick = output<{ index: number; item: GalleryItem }>()`

```

## Notes

- BEM block `.gallery`; elements: `__item`, `__img`, `__caption`, `__link`.
- Uses CSS vars: `--gutter`, `--c-bg-secondary`, `--c-border`, `--c-text-primary`.
- Change detection: OnPush.
```
