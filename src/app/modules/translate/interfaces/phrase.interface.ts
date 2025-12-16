import { CrudDocument } from 'wacom';

export interface Phrase extends CrudDocument<Phrase> {
	text: string;
	translation?: string;
}
