# ngx-page-testimonials

Angular v20 standalone Testimonials grid with signal inputs/outputs and BEM styles.

## Usage

```html
<page-testimonials
	[items]="testimonials"
	[minWidth]="260"
	[align]="'left'"
	[showAvatar]="true"
	(itemClick)="onTestimonial($event)"
></page-testimonials>
```

```ts
import { TestimonialItem } from './testimonials.component';

testimonials: TestimonialItem[] = [
  { quote: '“This layout saved us weeks.”', author: 'Jane Doe', title: 'Product Lead' },
  { quote: '“Clean BEM styles made reuse easy.”', author: 'Alex Kim', title: 'Frontend Eng', avatarUrl: 'assets/jpg/alex.jpg' },
];
```

## Inputs (signals)

- `items = input<TestimonialItem[]>(...)`
- `minWidth = input<number>(260)` – grid min column width, px
- `align = input<'left' | 'center' | 'right'>('left')` – text alignment
- `showAvatar = input<boolean>(true)` – show avatar when provided

### `TestimonialItem`

- `quote: string`
- `author: string`
- `title?: string`
- `avatarUrl?: string`
- `alt?: string`

## Outputs

- `itemClick = output<{ index: number; item: TestimonialItem }>()`

## Notes

- BEM block `.testimonials`; elements: `__item`, `__header`, `__avatar`, `__quote`, `__author`, `__name`, `__title`; modifiers: `--center`, `--right`.
- Uses CSS vars: `--gutter`, `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
