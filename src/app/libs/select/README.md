[![Angular v20](https://img.shields.io/badge/angular-v20+-red)]()
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)]()

# WAW Select Component (`wselect`)

A lightweight, signal-driven select with:

- single/multiple select
- search
- custom templates
- `[(wModel)]` two-way binding
- Signal Forms support via `[field]`
- Full Angular Forms (CVA) support

## Install

```bash
waw add ngx-select
```

---

## 🧩 Import

```ts
import { SelectComponent } from '@libs/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
	imports: [SelectComponent, FormsModule, ReactiveFormsModule],
})
export class DemoComponent {}
```

---

### 1️⃣ Signal Forms (`[field]`)

```html
<form>
	<wselect
		[field]="form.assignee"
		[items]="users"
		bindLabel="name"
		bindValue="_id"
	></wselect>
</form>
```

### 2️⃣ Template-Driven Form

```html
<wselect [items]="users" bindLabel="name" bindValue="_id" [(wModel)]="assignee">
</wselect>
```

### 3️⃣ Reactive Form (CVA)

```html
<wselect
	[items]="users"
	bindLabel="name"
	bindValue="_id"
	formControlName="assignee"
>
</wselect>
```

## Search

```html
<wselect [items]="items" [searchable]="true" [searchableBy]="'name email'">
</wselect>
```

## Multiple

```html
<wselect [items]="tags" [multiple]="true" [(wModel)]="selectedTagIds">
</wselect>
```

## Templates

```html
<wselect
	[items]="users"
	[t_view]="viewTpl"
	[t_item]="itemTpl"
	[t_search]="searchTpl"
>
</wselect>

<ng-template #viewTpl>
	<div>Custom header…</div>
</ng-template>

<ng-template #itemTpl let-item="item">
	<div>{{ item().name }} — custom row</div>
</ng-template>

<ng-template #searchTpl>
	<winput placeholder="Type to search…" (wChange)="onSearch($event)" />
</ng-template>
```

## API

### Inputs

- `items: unknown[]`
- `placeholder: string`
- `label: string`
- `bindLabel: string` (default: `"name"`)
- `bindValue: string` (default: `"_id"`)
- `multiple: boolean`
- `clearable: boolean`
- `disabled: boolean`
- `searchable: boolean`
- `searchableBy: string` (space-separated paths)
- `buttons: SelectButton[]`
- `t_view: TemplateRef`
- `t_item: TemplateRef`
- `t_search: TemplateRef`

### Two-way

- `[(wModel)]="value"` — selected id or array of ids (when `multiple`)

### Outputs

- `(wChange)="onChange($event)"` — emitted on selection changes (`id | id[]`)

## Notes

- With Signal Forms, use `[field]="form.myField"` on `<wselect>`. `Field` will bind through `ControlValueAccessor` (no extra wiring needed).
- Without Signal Forms, use `[(wModel)]`, `formControlName`, or `ngModel` as usual.
