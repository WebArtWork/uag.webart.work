import { CrudDocument } from 'wacom';
import { FormComponentInterface } from './component.interface';

export interface FormInterface {
	/** Developer-provided id used by virtual form/state */
	formId?: string;

	/** Optional UI title/class */
	title?: string;
	class?: string;

	/** Schema tree */
	components: FormComponentInterface[];
}

export interface Form extends CrudDocument<Form> {
	title: string;
	formId: string;
}
