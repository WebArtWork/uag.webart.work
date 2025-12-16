import { CrudDocument } from 'wacom';

export interface Translate extends CrudDocument<Translate> {
	slug?: string;
	phrase: string;
	language: string;
	text: string;
}
