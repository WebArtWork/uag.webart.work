import { Injectable, signal } from '@angular/core';
import { environment } from '@env';
import { CrudService } from 'wacom';
import { Formcomponent } from '../interfaces/component.interface';

@Injectable({ providedIn: 'root' })
export class FormcomponentService extends CrudService<Formcomponent> {
	components = signal<Formcomponent[]>([]);

	constructor() {
		super({
			name: 'formcomponent',
		});

		this.get({
			query: 'appId=' + environment.appId,
		});

		this.loaded.subscribe(() => {
			this.components.set(this.getDocs());
		});
	}
}
