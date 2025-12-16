import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertService } from '@lib/alert';
import { FormService } from '@lib/form';
import { TranslateDirective } from '@module/translate/directives/translate.directive';
import { TranslateService } from '@module/translate/services/translate.service';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { TableComponent } from 'src/app/libs/table/table.component';
import {
	CellDirective,
	TableHeaderDirective,
} from 'src/app/libs/table/table.directive';
import { CrudComponent } from 'wacom';
import { phraseForm } from '../../form/phrase.form';
import { Phrase } from '../../interfaces/phrase.interface';
import { LanguageSelectorComponent } from '../../selectors/language/language-selector.component';
import { LanguageService } from '../../services/language.service';
import { PhraseService } from '../../services/phrase.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		TableComponent,
		LanguageSelectorComponent,
		CellDirective,
		TableHeaderDirective,
		TranslateDirective,
	],
	templateUrl: './translates.component.html',
})
export class TranslatesComponent extends CrudComponent<
	PhraseService,
	Phrase,
	FormInterface
> {
	private _translateService = inject(TranslateService);

	override updatableFields = ['_id', 'text'];

	private _languageService = inject(LanguageService);

	private _alertService = inject(AlertService);

	columns = ['phrase', 'translation'];

	override configType: 'server' | 'local' = 'local';

	override allowCreate() {
		return false;
	}

	override allowUrl() {
		return false;
	}

	override update(doc: Phrase) {
		const language = this._languageService.language()?._id ?? '';

		const phrase = doc._id as string;

		if (language) {
			const translationSignal = this._translateService.translate(
				doc.text,
			);

			this._formService.modal<Phrase>(
				phraseForm,
				{
					label: 'Update',
					click: async (updated: unknown, close: () => void) => {
						close();

						const text = (updated as Phrase).translation as string;

						if (translationSignal() !== text) {
							await this._translateService.updateTranslation(
								text,
								phrase,
								language,
							);

							translationSignal.set(text);
						}
					},
				},
				{
					translation:
						translationSignal() === doc.text
							? ''
							: translationSignal(),
					text: doc.text,
				},
			);
		} else {
			this._alertService.show({
				text: 'Please select language first',
			});
		}
	}

	config = this.getConfig();

	constructor(
		private _formService: FormService,
		private _phraseService: PhraseService,
	) {
		super(phraseForm, _formService, _phraseService, 'phrase');

		this.config.headerButtons.unshift({
			icon: 'edit',
			click: () => {
				const language = this._languageService.language()?._id ?? '';

				if (language) {
					const translations = [];

					for (const phrase of this._phraseService.getDocs()) {
						translations.push(
							this._translateService.translate(phrase.text)(),
						);
					}

					this._formService
						.modalDocs<string>(
							translations,
							'Update translations for ' +
								this._languageService.language()?.name,
						)
						.then(async (translated: string[]) => {
							for (const [index, phrase] of this._phraseService
								.getDocs()
								.entries()) {
								const text = translated[index];

								if (text === undefined) continue;

								const translationSignal =
									this._translateService.translate(
										phrase.text,
									);

								if (translationSignal() !== text) {
									await this._translateService.updateTranslation(
										text,
										phrase._id as string,
										language,
									);

									translationSignal.set(text);
								}
							}
						});
				} else {
					this._alertService.show({
						text: 'Please select language first',
					});
				}
			},
		});

		this.setDocuments();
	}

	languageService = inject(LanguageService);
}
