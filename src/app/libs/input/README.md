[![Angular v20](https://img.shields.io/badge/angular-v20+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Input Component (`winput`)

A fully standalone, signal-based input component built for Angular v20+.
It integrates smoothly with **template-driven forms**, **reactive forms**, and **WAW Virtual Forms**, providing a unified API for any input type.

---

## ✨ Features

- Supports all standard HTML input types, plus radio, checkbox, and textarea.
- Reactive and template-driven form compatibility.
- Virtual form manager support for WAW apps.
- Built-in validation, replacement, and debounce logic.
- Clear button, error messages, and accessible structure.
- Fully themeable via CSS variables and BEM classes.

---

## 📦 Installation

```bash
waw add ngx-input
```

---

## 🧩 Import

```ts
import { InputComponent } from '@libs/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	imports: [InputComponent, FormsModule, ReactiveFormsModule],
})
export class DemoComponent {}
```

---

## 🧪 Usage Examples

### 1️⃣ Template-Driven Form

```html
<winput type="password" [(wModel)]="submission.password"></winput>
```

### 2️⃣ Reactive Form

```ts
import { FormGroup, FormControl, Validators } from '@angular/forms';

form = new FormGroup({
	password: new FormControl('', {
		nonNullable: true,
		validators: [Validators.required, Validators.minLength(8)],
	}),
});
```

```html
<winput type="password" [control]="form.get('password')"></winput>
```

### 3️⃣ Virtual Form

```html
<winput type="password" wFormId="submission" wFormKey="password"></winput>
```

## ⚙️ Inputs

| Input          | Type                                | Default      | Description                                                                              |
| -------------- | ----------------------------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `type`         | [`InputType`](#inputtype)           | `'text'`     | Input type (text, checkbox, radio, textarea, etc.).                                      |
| `wModel`       | [`InputValue`](#inputvalue)         | `''`         | Two-way model for template forms. Use `[(wModel)]`.                                      |
| `value`        | [`InputValue`](#inputvalue)         | `''`         | One-way value (used when not binding `wModel` or `control`).                             |
| `control`      | `AbstractControl<any> \| null`      | `null`       | Reactive Forms control (preferred for reactive usage).                                   |
| `items`        | `string[]`                          | `[]`         | Options for `radio` / `checkbox`.                                                        |
| `placeholder`  | `string`                            | `''`         | Placeholder text.                                                                        |
| `label`        | `string`                            | `''`         | Optional label text.                                                                     |
| `disabled`     | `boolean`                           | `false`      | Disables interaction. If `control` is provided, mirrors its disabled state.              |
| `focused`      | `boolean`                           | `false`      | Auto-focus after view init.                                                              |
| `clearable`    | `boolean`                           | `false`      | Shows clear (“close”) button.                                                            |
| `replace`      | `(value: InputValue) => InputValue` | `undefined`  | Transform/sanitize on change.                                                            |
| `valid`        | `(value: InputValue) => boolean`    | `(v) => !!v` | Validation check used by `wSubmit` when not using `control`.                             |
| `name`         | `string`                            | `'name'`     | Control name (radio grouping).                                                           |
| `wClass`       | `string`                            | `''`         | Extra CSS classes to apply to the field.                                                 |
| `autocomplete` | `string`                            | _(auto)_     | If not set and `type='password'`, defaults to `'current-password'`; otherwise untouched. |
| `wFormId`      | `string`                            | `''`         | Virtual form identifier.                                                                 |
| `wFormKey`     | `string`                            | `''`         | Virtual form field key.                                                                  |

> Binding priority (highest → lowest): `control` → `wModel` → `value`.

---

## 🚀 Outputs

| Output         | Type         | Description                                                                                                           |
| -------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `wModelChange` | `InputValue` | Emitted for two-way `[(wModel)]` binding.                                                                             |
| `wChange`      | `InputValue` | Emits debounced value (≈2s) after changes. For `control`, also calls `control.setValue(value, { emitEvent: false })`. |
| `wSubmit`      | `InputValue` | Emits on Enter / manual submit. With `control`, also `markAsTouched()`.                                               |
| `wBlur`        | `void`       | Emits on blur. With `control`, also `markAsTouched()`.                                                                |

---

## 🧠 Interfaces

```ts
export type InputValue =
	| null
	| string
	| number
	| boolean
	| string[]
	| number[]
	| boolean[];

export type InputType =
	| 'text'
	| 'password'
	| 'email'
	| 'radio'
	| 'checkbox'
	| 'textarea'
	| 'search'
	| 'tel'
	| 'url'
	| 'number'
	| 'range'
	| 'color'
	| 'date'
	| 'month'
	| 'week'
	| 'time'
	| 'datetime'
	| 'datetime-local';
```

---

## 🎨 Styling

- Root BEM block: `.winput`
- Elements: `__label`, `__control`, `__field`, `__clear`, `__error`, `__choice`, `__choice-text`, `__choice-mark`, `__native`
- Theme vars: `--c-border`, `--c-primary`, `--c-text-primary`, `--c-text-secondary`, `--b-radius`, `--c-shadow`, etc.
- Pass custom classes via `[wClass]`.

---

## 🧩 Integration Notes

| Mode           | How to bind                 | Notes                                                                                               |
| -------------- | --------------------------- | --------------------------------------------------------------------------------------------------- |
| Template forms | `[(wModel)]="model"`        | Keeps Angular’s `ngModel` out; clear API.                                                           |
| Reactive forms | `[control]="form.get('x')"` | Error state maps from `control.invalid && (touched \|\| dirty)`. `wSubmit`/`wBlur` mark as touched. |
| WAW forms      | `wFormId` + `wFormKey`      | Virtual manager integration; field emits `wSubmit` on Enter; service can aggregate submits.         |

---

## 🔎 Behavior spec (concise)

- **Enter key** → triggers `wSubmit` with current value.
- **Debounce** → `wChange` debounced (~2000 ms).
- **Errors**
    - With `control`: error UI follows control state.
    - Without `control`: `valid(value)` gates `wSubmit`; sets internal error signal on fail.

- **Autocomplete**
    - If `type='password'` and `autocomplete` not provided → use `'current-password'`.
    - If provided, component respects the given value.

---

## 🪪 License

MIT © 2025 Web Art Work
