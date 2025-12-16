# wbutton

Standalone button for Angular v20 with BEM-scoped styles, 2-second multi-click lock, and a matching directive so you can use either `<wbutton>` or `<button wbutton>`.

---

## ✨ Features

- Angular v20 standalone + `OnPush`
- BEM CSS (`.wbutton`, modifiers like `.wbutton--primary`)
- 2s click cooldown (opt-out via input)
- Works as component **and** directive
- Form-aware submit behavior
- Accessible disabled states

---

## 📦 Install

```bash
waw add ngx-button
```

---

## 🧩 Import (once) global styles for the directive

> Required so `<button wbutton>` gets the same styles.

```ts
import { Component } from '@angular/core';
import { ButtonStylesComponent } from 'src/app/libs/button/button-styles.component';

@Component({
	standalone: true,
	selector: 'app-root',
	imports: [ButtonStylesComponent],
	template: `<router-outlet />`,
})
export class AppComponent {}
```

---

## 🧪 Usage

### 1) Component

```html
<wbutton type="primary" (wClick)="save()">Save</wbutton>
```

```html
<wbutton
	type="danger"
	[disabled]="isBusy()"
	[extraClass]="'wbutton--wide'"
	(wClick)="remove()"
>
	Delete
</wbutton>
```

**Prevent submit inside forms**

```html
<form (ngSubmit)="submit()">
	<wbutton [disableSubmit]="true" (wClick)="openDialog()">Open</wbutton>
	<wbutton type="primary">Submit</wbutton>
</form>
```

**Block multiple clicks for 2s (default) / allow multiple**

```html
<wbutton (wClick)="payOnce()">Pay</wbutton>
<wbutton [isMultipleClicksAllowed]="true" (wClick)="spamMe()">Spam</wbutton>
```

### 2) Directive

```html
<button wbutton type="secondary" (wClick)="cancel()">Cancel</button>
```

```html
<button wbutton type="link" [extraClass]="'wbutton--wide'" (wClick)="details()">
	Details
</button>
```

On anchors:

```html
<a wbutton type="primary" (wClick)="navigate()">Go</a>
```

> For `<a wbutton>` “disabled” becomes `aria-disabled="true"` and click is prevented.

---

## ⚙️ API

### `<wbutton>` (component)

**Inputs**

- `type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' = 'primary'`
- `extraClass: string = ''` — extra CSS classes appended to root
- `disabled: boolean = false`
- `disableSubmit: boolean = false` — when `true`, forces `type="button"` (no form submit)
- `isMultipleClicksAllowed: boolean = false` — when `false`, blocks subsequent clicks for **2s**

**Outputs**

- `wClick: void` — emitted on each accepted click

**Behavior**

- Default `type="submit"` inside forms; switches to `"button"` when `disableSubmit === true`.

---

### `wbutton` (directive)

**Selector**

- `button[wbutton], a[wbutton]`

**Inputs**

- Same as component: `type`, `extraClass`, `disabled`, `disableSubmit`, `isMultipleClicksAllowed`

**Outputs**

- `wClick: void`

**Behavior**

- Sets `type="submit"`/`"button"` only on real `<button>`.
- Applies `disabled` attribute only on `<button>`.
- For `<a>`: uses `aria-disabled` + prevents default while “disabled”.
- 2s cooldown identical to component.

---

## 🎨 Styles (BEM)

Root block: `.wbutton`
Modifiers:

- `.wbutton--primary`
- `.wbutton--secondary`
- `.wbutton--success`
- `.wbutton--warning`
- `.wbutton--danger`
- `.wbutton--info`
- `.wbutton--light`
- `.wbutton--dark`
- `.wbutton--link`

State:

- `.is-disabled`

> The directive receives these styles via `ButtonStylesComponent` (global encapsulation).

---

## 🧱 Theming

Relies on your design tokens:

- `--c-primary`, `--c-secondary`, `--c-text-primary`, `--c-white`, `--c-border`, `--transition`, etc.

Override globally, or pass utility classes via `extraClass`.

---

## 📝 Notes

- Change detection: `ChangeDetectionStrategy.OnPush`
- Multi-click lock uses an internal 2s cooldown; set `isMultipleClicksAllowed="true"` to opt out.
- Prefer `(wClick)` for semantic consistency across both component and directive.
