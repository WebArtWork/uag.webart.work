# ngx-page-tabs

Angular v20 standalone Tabs with signal inputs/outputs, a11y roles, keyboard nav, and BEM styles.

## Usage

```html
<page-tabs
	[items]="[
    {label:'Overview', content:'Overview content…'},
    {label:'Details', content:'Details content…'},
    {label:'Reviews', content:'Reviews content…'}
  ]"
	[index]="0"
	[stretch]="false"
	(indexChange)="onTabChange($event)"
></page-tabs>
```

## Inputs (signals)

- `items = input<TabItem[]>(...)`
- `index = input<number>(0)` – active tab (0-based)
- `stretch = input<boolean>(false)` – make nav buttons equal width

### `TabItem`

- `label: string`
- `content?: string`
- `disabled?: boolean`
- `id?: string` (used to form `tabpanel` id)

## Outputs

- `indexChange = output<number>()` – when selection changes
- `tabClick = output<{ index: number; item: TabItem }>()`

## Accessibility & Keyboard

- Roles: `tablist`, `tab`, `tabpanel`
- Keys: `ArrowLeft/Right`, `Home`, `End` to move focus; `Enter`/`Space` to activate.
- Disabled tabs are skipped during arrow navigation.

## Notes

- BEM block `.tabs`; elements: `__nav`, `__btn`, `__panel`; modifiers: `__btn--active`, `__btn--disabled`, `__nav--stretch`.
- Uses theme vars: `--c-bg-secondary`, `--c-border`, `--c-primary`, `--c-white`.
- Change detection: OnPush.
