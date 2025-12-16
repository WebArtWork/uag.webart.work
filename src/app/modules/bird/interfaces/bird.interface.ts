import { CrudDocument } from 'wacom';

export interface Bird extends CrudDocument<Bird> {
	name: string;
	description: string;
}
