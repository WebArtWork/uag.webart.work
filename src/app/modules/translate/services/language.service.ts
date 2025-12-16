import { effect, inject, Injectable, signal } from '@angular/core';
import { CrudService, EmitterService, StoreService } from 'wacom';
import { Language } from '../interfaces/language.interface';

@Injectable({
	providedIn: 'root',
})
export class LanguageService extends CrudService<Language> {
	language = signal<Language | undefined>(undefined);

	languages = signal<Language[]>(this.getDocs());

	private _storeService = inject(StoreService);

	private _emitterService = inject(EmitterService);

	private _languageId = signal<string | null>(null);

	constructor() {
		super({
			name: 'translatelanguage',
			unauthorized: true,
		});

		this.loaded.subscribe({
			next: () => {
				this.languages.set(this.getDocs());

				this._loadLocal();
			},
		});

		this.get().subscribe(() => {
			this.languages.set(this.getDocs());

			this._loadLocal();
		});

		this._emitterService.on('translatelanguage_changed').subscribe(() => {
			this.languages.set(this.getDocs());
		});

		effect(() => {
			const id = this._languageId();

			const languages = this.languages();

			if (!id || !languages.length) {
				this.language.set(undefined);
				return;
			}

			const lang = languages.find((l) => l._id === id);

			if (lang) {
				this.language.set(lang);

				this._storeService.set('languageId', id);

				this._emitterService.emit('languageId', id);
			}
		});
	}

	setLanguageId(languageId: string | null = null) {
		this._languageId.set(languageId);
	}

	setLanguage(language: Language) {
		if (language?._id) {
			this._languageId.set(language._id);
		}
	}

	nextLanguage() {
		const languages = this.getDocs();

		if (languages.length > 1) {
			const language = this.language();

			const index = language
				? languages.findIndex((_language) => {
						return _language._id === language._id;
					})
				: 0;

			this.setLanguage(
				index === languages.length - 1
					? languages[0]
					: languages[index + 1],
			);
		} else {
			this._languageId.set(null);
		}
	}

	private _loadLocal() {
		this._storeService.get('languageId', (languageId) => {
			if (languageId) {
				this._languageId.set(languageId);
			}
		});
	}
}
