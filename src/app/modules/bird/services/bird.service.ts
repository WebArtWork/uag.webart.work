import { Injectable } from '@angular/core';
import { CrudService } from 'wacom';
import { Bird } from '../interfaces/bird.interface';

@Injectable({
	providedIn: 'root',
})
export class BirdService extends CrudService<Bird> {
	constructor() {
		super({
			name: 'bird',
		});
	}
}
