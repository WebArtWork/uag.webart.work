import {
	APP_INITIALIZER,
	ApplicationRef,
	EnvironmentInjector,
	Provider,
	Type,
	createComponent,
} from '@angular/core';
import { FormInterface } from '@lib/form';
import { AceFormComponent } from './form-components/ace/ace.component';
import { aceForm } from './form-components/ace/ace.form';
import { ButtonFormComponent } from './form-components/button/button.component';
import { buttonForm } from './form-components/button/button.form';
import { FileFormComponent } from './form-components/file/file.component';
import { fileForm } from './form-components/file/file.form';
import { InputFormComponent } from './form-components/input/input.component';
import { inputForm } from './form-components/input/input.form';
import { SelectFormComponent } from './form-components/select/select.component';
import { selectForm } from './form-components/select/select.form';
import { TinymceFormComponent } from './form-components/tinymce/tinymce.component';
import { tinymceForm } from './form-components/tinymce/tinymce.form';
/* componnets */

export const FORM_COMPONENTS = [
	'Input',
	'Select',
	'File',
	'Button',
	'Ace',
	'Tinymce',
];

export const FORM_COMPONENT_FORM = (key: string): FormInterface => {
	return {
		Input: inputForm,
		Select: selectForm,
		File: fileForm,
		Button: buttonForm,
		Ace: aceForm,
		Tinymce: tinymceForm,
	}[key] as FormInterface;
};

/**
 * Central registry: template name → component class.
 * Names must match `component.name` in form schema (e.g. `{ name: 'Input', ... }`)
 * and what the template component passes into FormService.addTemplateComponent().
 */
export const FORM_TEMPLATE_COMPONENTS: Record<string, Type<unknown>> = {
	Input: InputFormComponent,
	Select: SelectFormComponent,
	File: FileFormComponent,
	Button: ButtonFormComponent,
	Ace: AceFormComponent,
	Tinymce: TinymceFormComponent,
	/* addComponents */
};

function registerFormTemplatesFactory(
	injector: EnvironmentInjector,
	appRef: ApplicationRef,
): () => void {
	return () => {
		// Instantiate each template component once so their ngOnInit runs
		// and they call FormService.addTemplateComponent(name, templateRef)
		Object.values(FORM_TEMPLATE_COMPONENTS).forEach((cmp) => {
			const ref = createComponent(cmp, {
				environmentInjector: injector,
			});

			appRef.attachView(ref.hostView);
			(ref.hostView as any).detectChanges?.();
			// no DOM insertion – purely for registration side-effects
		});
	};
}

export const provideFormComponents = (): Provider => {
	return {
		provide: APP_INITIALIZER,
		multi: true,
		useFactory: registerFormTemplatesFactory,
		deps: [EnvironmentInjector, ApplicationRef],
	};
};
