# README — WAW CSS (tokens + utilities + grid)

## What is this?

A lightweight CSS layer for waw ngx projects:

- **Design tokens** (CSS variables) for theming
- **Responsive grid** compatible with old `.row` / `.col-*` classes
- Small, composable **utility classes** (spacing, flex, display, position, overflow, z-index, visibility, typography, color)
- A11y helpers (visually hidden, stretched link)
- **Layout primitives** (`.stack`, `.cluster`, `.grid`, `.reel`, `.sidebar`)

## Design tokens (override per app/theme)

All tokens live in `utils/_vars.scss` (CSS variables on `:root`), e.g.:

- Colors: `--c-primary`, `--c-bg-primary`, `--c-border`, …
- Typography: `--ff-base`, `--fs`
- Radii: `--b-radius`, `--b-radius-card`, `--b-radius-btn`
- Spacing scale: `--sp-0` … `--sp-8` (4px steps by default)
- Motion: `--motion`, `--easing`
- Layout: `--container`, `--gutter`
- Focus ring: `--focus-ring`

Dark mode: override under `html.dark:root { … }`.

## Breakpoints

Defined in `utils/_media.scss`:

- **xs** 0, **sm** 576px, **md** 768px, **lg** 992px, **xl** 1200px, **xxl** 1980px
  Responsive utility suffixes use: `-sm`, `-md`, `-lg`, `-xl`.
  Example: `d-none-md` hides from md and up.

## Grid (back-compatible upgrade)

```html
<div class="row g-4 items-center">
	<div class="col-2 col-3-md">A</div>
	<div class="col-2 col-23-md off-25-md">B</div>
</div>
```

- Columns: `.col-5`(20%), `.col-4`(25%), `.col-3`(33.33%), `.col-25`(40%), `.col-2`(50%), `.col-23`(66.66%), `.col-1`(100%)
- Offsets: `.off-2`, `.off-3-md`, …
- Row alignment: `.start .center .end .between .around`, items: `.items-start|center|end|stretch`
- Direction/wrap: `.reverse`, `.nowrap`
- Gutters (both axes): `.g-0 … .g-7` (per-axis: `.gx-*`, `.gy-*`)
- Visibility helpers: `.show-sm|md|lg|xl`, `.hide-sm|md|lg|xl`

## Spacing (margin/padding)

- Axis: `.m-3 .mx-2 .my-4` and `.p-3 .px-2 .py-4`
- Sides: `.mt-2 .pr-5 …`
- Values map to tokens: `--sp-0 … --sp-8`
  Responsive: add suffix, e.g. `.px-4-md`.

## Display / Flex / Grid

- Display: `.d-none .d-block .d-ib .d-f .d-grid`
- Direction: `.fd-r .fd-c`
- Wrap: `.fw-w .fw-nw`
- Justify: `.jc-fs .jc-c .jc-sb .jc-sa .jc-se`
- Align items: `.ai-fs .ai-c .ai-fe .ai-st`
- Align content: `.ac-fs … .ac-st`
- Self: `.self-c`, growth/shrink: `.fg-1`, `.fs-0`

## Position / Overflow / Z-index

- Position: `.pos-static .pos-rel .pos-abs .pos-fix .pos-sticky`
- Inset logical: `.top-0 .start-50 .bottom-100 …`
- Translate: `.translate-middle(-x|-y)`
- Overflow: `.overflow-auto|hidden|scroll|visible` (+ axis variants)
- Z: `.z-0 .z-1 .z-10 .z-100 .z-1000`
- **Stretched link**: `.stretched-link > a::after` makes the whole block clickable.

## Containers

- Fluid: `.container-fluid`
- Fixed: `.container-sm|md|lg|xl|xxl` (tokenized max-widths)
- Width helpers: `.w-auto .w-25 .w-33 .w-50 .w-66 .w-75 .w-100`
  Min/max: `.minw-0 .maxw-100 …`

## Typography

- Font size steps: `.fs-0 … .fs-8` (fluid `clamp()` scale)
- Line height: `.lh-1 … .lh-4`
- Weights: `.fw-300 … .fw-900`
- Letter spacing: `.ls-tight|normal|loose`
- Text helpers: `.ta-l|c|r`, `.tt-u`, `.ws-nw|pl|n`

## Color & State

- Text: `.text-primary|secondary|white|black|muted`
- Backgrounds: `.bg-primary|secondary|white|black|body`
- Borders: `.border .border-0 .border-top|end|bottom|start`
- Radius: `.rounded .rounded-0 .rounded-lg .rounded-full .rounded-card`
- Shadows: `.shadow-sm .shadow .shadow-lg`
- Disable / pointer: `.disabled`, `.pe-none|auto`
- Cursor: `.cursor-pointer|default|move|not-allowed`
- Opacity: `.opacity-0|25|50|75|100`

## A11y

- **Visually hidden** (screen-reader only): `.visually-hidden`
- **Reveal on focus** (skip links): `.visually-hidden-focusable`
- **Focus ring** uses token `--focus-ring`

## Layout primitives

- **Stack** (vertical spacing): `.stack [--gap]`, variants: `.stack--sm|lg`
- **Cluster** (wrap row, evenly spaced chips/controls): `.cluster`, plus `--start|--end|--between`
- **Grid** (CSS Grid wrapper): `.grid` with `--cols`, `--gap`
- **Reel** (horizontal scroller): `.reel` (snap)
- **Sidebar** (two-column, collapses on ≤991px)

## Visibility helpers

- `.show-sm|md|lg|xl`, `.hide-sm|md|lg|xl`

## Examples

```html
<!-- Card with stretched link -->
<article class="stretched-link shadow rounded p-4">
	<h3 class="fs-4 lh-2 fw-700 mb-2">Title</h3>
	<p class="text-muted lh-4 mb-3">Small description…</p>
	<a href="/details" class="visually-hidden">Open</a>
</article>

<!-- Responsive form row -->
<div class="row g-4 items-center">
	<div class="col-1 col-2-md">
		<label class="fs-2 lh-3 ls-normal">Email</label>
	</div>
	<div class="col-1 col-23-md">
		<div class="stack">
			<winput formId="profile" formKey="email"></winput>
			<small class="text-muted">We’ll never share your email.</small>
		</div>
	</div>
</div>
```

## Conventions

- Utilities: **dash-case** (e.g., `jc-sb`, `fs-4`)
- Components: **BEM** (`.block__el--mod`)
- No `!important` unless required for a11y (`.visually-hidden`)

## Migration notes

- Legacy grid classes remain: `.row`, `.col-*`, `.off-*`.
- Prefer utilities over component-specific CSS where possible.
- Dark theme: toggle `html.dark` (or bind it to your theme service).
