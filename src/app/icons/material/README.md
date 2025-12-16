# ngx-icon-material

A tiny Angular v20 nav/link helper that renders a **Material Icon** with an optional text label and an active underline. Uses signal inputs and RouterLink/RouterLinkActive.

---

## Usage

```html
<!-- Icon only -->
<material-icon routerLink="/home" icon="home"></material-icon>

<!-- Icon with label -->
<material-icon
	routerLink="/components"
	icon="apps"
	name="Components"
></material-icon>
```

> Make sure the **Material Icons** font is available in your app (e.g., include the Google Fonts link or your local font).

---

## Inputs (signals)

| Input        | Type   | Default  | Description                                                                        |
| ------------ | ------ | -------- | ---------------------------------------------------------------------------------- |
| `routerLink` | string | `''`     | Target route. Passed to Angular’s `[routerLink]`.                                  |
| `icon`       | string | `'home'` | Material Icon name (e.g., `home`, `settings`, `dashboard`).                        |
| `name`       | string | `''`     | Optional text shown to the right of the icon. If empty, only the icon is rendered. |

---

## Behavior

- **Active state:** when the current route matches, Angular adds `_activeLink`; the component draws a **60% width underline** centered **under the icon** only.
- **Hover:** icon and label color shift to `var(--c-primary)`.
- **No label layout:** spacing collapses automatically when `name` is not provided.

---

## Theming & CSS Vars

The component relies on your global tokens:

- `--c-text-secondary`, `--c-text-primary`, `--c-primary`
- `--b-radius-btn`, `--sp-2`, `--motion`, `--easing`

You can override these at any container level to fit your theme.

---

## Accessibility

- When `name` is empty, consider wrapping with a contextual label (e.g., `aria-label` on a parent) or provide a `name` for readable text.
- Icon uses the `material-icons` glyph set.

---

## Example (inside a top bar)

```html
<nav class="d-f ai-c g-2">
	<material-icon routerLink="/home" icon="home" name="Home"></material-icon>
	<material-icon
		routerLink="/components"
		icon="widgets"
		name="Components"
	></material-icon>
	<material-icon routerLink="/settings" icon="settings"></material-icon>
</nav>
```
