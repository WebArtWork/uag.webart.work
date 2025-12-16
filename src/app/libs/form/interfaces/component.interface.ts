// import { VirtualValidatorFn } from 'src/app/virtual-form.service';

import { CrudDocument } from 'wacom';

/** Use props instead of array fields */
export interface FormComponentInterface {
	/** Container/grouping */
	components?: FormComponentInterface[];

	/** Template name in registry */
	name?: string;

	/** Flat key; supports repeater notation like "items[].name" */
	key?: string;

	/** UI */
	class?: string;
	hidden?: boolean;

	/** Focus helpers */
	focus?: () => void;
	focused?: boolean;

	/** Validation (preferred) */
	required?: boolean;
	// validators?: VirtualValidatorFn[];

	/** Basic disabled flag; for dynamic rules, consider disabledWhen */
	disabled?: boolean;
	disabledWhen?: (values: Record<string, unknown>) => boolean;

	/** Arbitrary props passed to the template (label, placeholder, items, etc.) */
	props?: Record<string, unknown>;
}

/** @deprecated Replaced by props: Record<string, unknown> */
export interface TemplateFieldInterface {
	name: string;
	value: unknown;
}

/** Registry entry kept simple: name + component */
export interface TemplateComponentInterface {
	name: string;
	component: unknown;
}

export interface Formcomponent extends CrudDocument<Formcomponent> {
	formId: string;
	name: string;
	key: string;
	props: Record<string, unknown>;
	components: string[];
}
