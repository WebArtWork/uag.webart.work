# ngx-page-form

Angular v20 standalone wrapper around your `<wform>` with signal inputs/outputs and BEM styles.

## Usage

```html
<page-form
	[formConfig]="docForm"
	[submitLabel]="'Submit'"
	[cancelLabel]="'Cancel'"
	[showCancel]="true"
	[actionsAlign]="'right'"
	(submitClick)="onSubmit()"
	(cancelClick)="onCancel()"
></page-form>
```

```ts
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';

docForm: FormInterface = {
	formId: 'docForm',
	title: 'Doc form',
	components: [
		/* ... */
	],
};
```

## Inputs (signals)

- `formConfig = input.required<FormInterface>()`
- `submitLabel = input<string>('Submit')`
- `cancelLabel = input<string>('Cancel')`
- `showCancel = input<boolean>(true)`
- `actionsAlign = input<'left' | 'center' | 'right'>('right')`

## Outputs

- `submitClick = output<void>()`
- `cancelClick = output<void>()`

## Notes

- BEM block `.form`; element `__actions`; modifiers `__actions--center`, `__actions--left`.
- Uses CSS vars: `--c-bg-secondary`, `--c-border`.
- Change detection: OnPush.
