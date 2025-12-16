# ngx-page-cta

Angular v20 standalone CTA block with signal inputs/outputs and BEM styles.

## Usage

```html
<page-cta
	[title]="'Ready to build?'"
	[desc]="'Use these blocks to launch pages in hours, not weeks.'"
	[primaryText]="'Start now'"
	[secondaryText]="'Contact sales'"
	[primaryType]="'primary'"
	[secondaryType]="'info'"
	[showSecondary]="true"
	[align]="'left'"
	(primaryClick)="onPrimary()"
	(secondaryClick)="onSecondary()"
></page-cta>
```

## Inputs (signals)

- `title = input<string>('Ready to build?')`
- `desc = input<string>('Use these blocks to launch pages in hours, not weeks.')`
- `primaryText = input<string>('Start now')`
- `secondaryText = input<string>('Contact sales')`
- `primaryType = input<'primary' | 'info' | 'success' | 'warn' | 'danger' | 'secondary'>('primary')`
- `secondaryType = input<'primary' | 'info' | 'success' | 'warn' | 'danger' | 'secondary'>('info')`
- `showSecondary = input<boolean>(true)`
- `align = input<'left' | 'center' | 'right'>('left')`

## Outputs

- `primaryClick = output<void>()`
- `secondaryClick = output<void>()`

## Notes

- BEM block `.cta`; elements: `__body`, `__title`, `__desc`, `__actions`; modifiers: `--center`, `--right`.
- Uses CSS vars: `--c-bg-secondary`, `--c-border`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
