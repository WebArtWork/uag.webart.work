# ngx-page-footer

Angular v20 standalone local footer with signal inputs/outputs and BEM styles.

## Usage

```html
<page-footer
	[leftText]="'© 2025 Web Art Work'"
	[links]="[{label:'Terms',href:'#'},{label:'Privacy',href:'#'},{label:'Contact',href:'#'}]"
	[justify]="'space-between'"
	[ariaLabel]="'Local footer'"
	(linkClick)="onFooterLink($event)"
></page-footer>
```

## Inputs (signals)

- `leftText = input<string>('© 2025 Web Art Work')`
- `links = input<FooterLink[]>(...)`
- `justify = input<'space-between' | 'start' | 'center' | 'end'>('space-between')`
- `ariaLabel = input<string>('Local footer')`

### `FooterLink`

- `label: string`
- `href?: string`
- `target?: string`
- `rel?: string`

## Outputs

- `linkClick = output<{ index: number; item: FooterLink }>()`

## Notes

- BEM block `.footer`; elements `__left`, `__right`, `__link`.
- Uses CSS vars: `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
