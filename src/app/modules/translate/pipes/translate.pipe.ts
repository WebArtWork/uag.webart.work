import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
	/**
	 * Transforms the given slug into its corresponding translated string.
	 * @param text - The translation text to be translated.
	 * @returns The translated Signal<string>.
	 */
	transform(text: string) {
		return this._translateService.translate(text);
	}

	private _translateService = inject(TranslateService);
}
