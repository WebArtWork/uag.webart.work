import { inject, Injectable, signal } from '@angular/core';
import { EmitterService, HttpService, StoreService } from 'wacom';
import { DiiaUser } from './diia.interface';

@Injectable({
	providedIn: 'root',
})
export class DiiaService {
	private _httpService = inject(HttpService);

	private _storeService = inject(StoreService);

	private _emitterService = inject(EmitterService);

	user = signal<DiiaUser | undefined>(undefined);

	constructor() {
		if (localStorage.getItem('waw_user')) {
			this._load();
		} else {
			this._emitterService
				.onComplete('us.user')
				.subscribe(this._load.bind(this));
		}
	}

	// TODO remove region from param on production Diia
	sign(region: string) {
		this._httpService
			.post('/api/diia/sign', {
				region,
			})
			.subscribe(this._set.bind(this));
	}

	private _load() {
		this._storeService.getJson('diia', (user) => {
			this._set(user as DiiaUser | null);
		});

		this._httpService
			.get('/api/diia/fetch')
			.subscribe(this._set.bind(this));
	}

	private _set = (user: DiiaUser | null) => {
		if (user) {
			this.user.set(user);

			this._storeService.setJson('diia', user);
		}
	};
}
