import { Injectable, inject, signal } from '@angular/core';
import { CrudService, EmitterService } from 'wacom';
import { Phrase } from '../interfaces/phrase.interface';

@Injectable({
	providedIn: 'root',
})
export class PhraseService extends CrudService<Phrase> {
	/** flat list for UI if needed */
	phrases = signal<Phrase[]>(this.getDocs());

	/** phrases grouped by text */
	private _phrasesByText: Record<string, Phrase[]> = {};

	/** avoid duplicate create() calls per text */
	private _creating: Record<string, boolean> = {};
	/** queue updates to signals outside render */
	private _syncPending = false;

	/** initial load state */
	private _initialized = false;
	readonly ready: Promise<void>;
	private _readyResolve?: () => void;

	private _emitter = inject(EmitterService);

	constructor() {
		super({
			name: 'translatephrase',
			unauthorized: true,
		});

		this.ready = new Promise<void>((resolve) => {
			this._readyResolve = resolve;
		});

		// keep phrases grouped by text and notify others on any change
		this.filteredDocuments(this._phrasesByText, {
			field: 'text',
			filtered: () => this._scheduleSync(),
		});

		this.get().subscribe(() => {
			this._scheduleSync();
			this._initialized = true;

			this._readyResolve?.();
		});
	}

	getByText(text: string) {
		const list = this._phrasesByText[text];
		return list?.[0];
	}

	hasText(text: string) {
		return !!this.getByText(text);
	}

	/**
	 * Ensure Phrase(text) exists:
	 * - waits until initial phrases load is done (to avoid duplicates)
	 * - checks if phrase already exists
	 * - creates once per text
	 */
	async ensurePhrase(text: string) {
		if (!text) return;

		if (!this._initialized) {
			try {
				await this.ready;
			} catch {
				return;
			}
		}

		if (this.hasText(text)) return;

		if (this._creating[text]) return;

		this._creating[text] = true;

		this.create({ text } as Phrase).subscribe({
			error: () => {
				delete this._creating[text];
			},
			complete: () => {
				delete this._creating[text];
			},
		});
	}

	private _scheduleSync() {
		if (this._syncPending) return;
		this._syncPending = true;

		queueMicrotask(() => {
			this._syncPending = false;
			this.phrases.set(this.getDocs());
			this._emitter.emit('translatephrase_changed');
		});
	}
}
