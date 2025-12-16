# ngx-page-faq

Angular v20 standalone FAQ (accordion) with signal inputs and BEM styles.

## Usage

```html
<page-faq
	[items]="faqList"
	[singleOpen]="true"
	(toggled)="onFaqToggled($event)"
></page-faq>
```

```ts
import { FaqItem } from './faq.component';

faqList: FaqItem[] = [
  { q: 'What is included?', a: 'Everything you need to ship pages fast.' },
  { q: 'Is it customizable?', a: 'Yes, components are modular and themeable.' },
];
```

## Inputs (signals)

- `items = input<FaqItem[]>(...)`
- `singleOpen = input<boolean>(false)` – accordion mode

### `FaqItem`

- `q: string`
- `a: string`

## Outputs

- `toggled = output<{ index: number; open: boolean }>()`

```

## Notes

- BEM block `.faq`; elements: `__item`, `__q`, `__a`; modifier: `__item--open`.
- Uses CSS vars: `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
```
