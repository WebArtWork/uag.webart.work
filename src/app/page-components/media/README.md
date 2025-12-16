# ngx-page-media

Angular v20 standalone Media (image + text) with signal inputs/outputs and BEM styles.

## Usage

```html
<page-media
	[mediaUrl]="'assets/default.png'"
	[mediaAlt]="'Preview'"
	[title]="'Composable by design'"
	[paragraphs]="[
    'Use one block for docs, landing, or shop pages with minimal changes.',
    'Scoped elements keep styles predictable and portable.'
  ]"
	[side]="'right'"
	[cols]="'1fr 1fr'"
	(imageClick)="onMediaClick()"
></page-media>
```

## Inputs (signals)

- `mediaUrl = input<string>('assets/default.png')`
- `mediaAlt = input<string>('Preview')`
- `title = input<string>('Composable by design')`
- `paragraphs = input<string[]>([ ... ])`
- `side = input<'left' | 'right'>('right')`
- `cols = input<string>('1fr 1fr')` – applied to `grid-template-columns`

## Outputs

- `imageClick = output<void>()`

## Notes

- BEM block `.media`; elements: `__img`, `__body`, `__title`, `__desc`; modifier: `--media-left`.
- Uses CSS vars: `--gutter`, `--c-text-primary`, `--c-text-secondary`.
- Change detection: OnPush.
