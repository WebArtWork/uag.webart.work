# ngx-page-hero

Angular v20 standalone Hero with signal inputs/outputs and BEM styles.

## Usage

```html
<page-hero
	[title]="'Build anything faster'"
	[desc]="'One modular layout to cover product, content, and commerce pages.'"
	[primaryText]="'Get started'"
	[secondaryText]="'Learn more'"
	[primaryType]="'primary'"
	[secondaryType]="'info'"
	[showSecondary]="true"
	[mediaUrl]="'assets/default.png'"
	[mediaAlt]="'Hero'"
	[mediaSide]="'right'"
	[cols]="'1.1fr 0.9fr'"
	(primaryClick)="onHeroPrimary()"
	(secondaryClick)="onHeroSecondary()"
	(mediaClick)="onHeroMedia()"
></page-hero>
```

## Inputs (signals)

- `title = input<string>('Build anything faster')`
- `desc = input<string>('One modular layout to cover product, content, and commerce pages.')`
- `primaryText = input<string>('Get started')`
- `secondaryText = input<string>('Learn more')`
- `primaryType = input<'primary' | 'info' | 'success' | 'warn' | 'danger' | 'secondary'>('primary')`
- `secondaryType = input<'primary' | 'info' | 'success' | 'warn' | 'danger' | 'secondary'>('info')`
- `showSecondary = input<boolean>(true)`
- `mediaUrl = input<string>('assets/default.png')`
- `mediaAlt = input<string>('Hero')`
- `mediaSide = input<'left' | 'right'>('right')`
- `cols = input<string>('1.1fr 0.9fr')` – applied to `grid-template-columns`

## Outputs

- `primaryClick = output<void>()`
- `secondaryClick = output<void>()`
- `mediaClick = output<void>()`

## Notes

- BEM block `.hero`; elements: `__body`, `__title`, `__desc`, `__actions`, `__media`; modifier: `--media-left`.
- Uses CSS vars: `--gutter`.
- Change detection: OnPush.
