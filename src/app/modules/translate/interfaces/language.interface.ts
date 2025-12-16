import { CrudDocument } from 'wacom';

export interface Language extends CrudDocument<Language> {
	name: string;
	description: string;
}
