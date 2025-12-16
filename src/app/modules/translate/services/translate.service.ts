import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CrudService, EmitterService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';
import { Translate } from '../interfaces/translate.interface';
import { PhraseService } from './phrase.service';

@Injectable({ providedIn: 'root' })
export class TranslateService extends CrudService<Translate> {
	constructor() {
		super({
			name: 'translate',
			unauthorized: true,
			replace: (doc) => {
				doc.slug = doc.phrase + doc.language;
			},
		});

		// map translates by slug
		this.filteredDocuments(this._translates, {
			field: 'slug',
			filtered: () => this._scheduleRecalc(),
		});

		// reload translations when language changes
		this._emitterService.on('languageId').subscribe((languageId) => {
			this.loadTranslate(languageId as string);
		});

		// when phrases change (created/renamed/deleted) – recompute translations
		this._emitterService
			.on('translatephrase_changed')
			.subscribe(() => this._scheduleRecalc());
	}

	loadTranslate(languageId: string) {
		if (this._languageId === languageId) return;

		this._languageId = languageId;

		this.get({ query: 'language=' + languageId }).subscribe(() => {
			this._scheduleRecalc();
		});
	}

	/**
	 * Main API: get a signal with translation for given text.
	 * If phrase is missing, PhraseService will auto-create it
	 * (after phrases are fully loaded from backend).
	 */
	translate(text: string): WritableSignal<string> {
		if (!this._signalTranslates[text]) {
			this._signalTranslates[text] = signal(this._getTranslation(text));
			// fire-and-forget outside the current render tick to avoid signal writes during render
			queueMicrotask(() => void this._phraseService.ensurePhrase(text));
		}

		return this._signalTranslates[text];
	}

	async updateTranslation(text: string, phrase: string, language: string) {
		const translate = await this.getDoc((_translate: Translate) => {
			return (
				_translate.language === language && _translate.phrase === phrase
			);
		});

		if (translate) {
			translate.text = text;

			if (translate.text !== text) {
				this.update(translate);
			}
		} else {
			this.create({
				language,
				phrase,
				text,
			});
		}
	}

	/* ──────────────────────────────────────────────────────────────────────────
	   Internal
	   ────────────────────────────────────────────────────────────────────────── */

	private _phraseService = inject(PhraseService);
	private _emitterService = inject(EmitterService);

	private _translates: Record<string, Translate[]> = {};
	private _signalTranslates: Record<string, WritableSignal<string>> = {};

	private _languageId = '';

	/** microtask coalescing flags */
	private _recalcPending = false;
	private _recalcInProgress = false;

	private _scheduleRecalc(): void {
		if (this._recalcPending) return;
		this._recalcPending = true;

		queueMicrotask(() => {
			this._recalcPending = false;
			this._reTranslateNow();
		});
	}

	private _reTranslateNow(): void {
		if (this._recalcInProgress) return;
		this._recalcInProgress = true;

		try {
			for (const text of Object.keys(this._signalTranslates)) {
				const next = this._getTranslation(text);
				if (this._signalTranslates[text]() !== next) {
					this._signalTranslates[text].set(next);
				}
			}
		} finally {
			this._recalcInProgress = false;
		}
	}

	private _getTranslation(text: string): string {
		const phrase: Phrase | undefined = this._phraseService.getByText(text);

		if (phrase && this._languageId) {
			const slug = (phrase._id as string) + this._languageId;
			const list = this._translates[slug];

			if (list?.length) {
				return list[0].text;
			}
		}

		return text;
	}
}
