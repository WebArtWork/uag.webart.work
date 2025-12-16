import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	computed,
	effect,
	inject,
	input,
	model,
	output,
	signal,
} from '@angular/core';
import { take } from 'rxjs';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent } from 'src/app/libs/select/select.component';
import { SelectButton } from 'src/app/libs/select/select.interface';
import { SelectValue } from 'src/app/libs/select/select.type';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { CrudComponent } from 'wacom';
import { languageForm } from '../../form/language.form';
import { Language } from '../../interfaces/language.interface';
import { LanguageService } from '../../services/language.service';

@Component({
	selector: 'language-selector',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent, TranslatePipe],
	templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent extends CrudComponent<
	LanguageService,
	Language,
	FormInterface
> {
	override configType: 'server' | 'local' = 'local';

	/* ==== Injects ==== */
	private _languageService = inject(LanguageService);
	private _form = inject(FormService);
	private _cdr = inject(ChangeDetectorRef);

	/* ==== Inputs ==== */
	readonly searchable = input<boolean>(true);
	readonly clearable = input<boolean>(true);
	readonly disabled = input<boolean>(false);
	readonly isMutatable = input<boolean>(false);

	/** external model (same name as wselect) */
	readonly wModel = model<SelectValue>(null, { alias: 'wModel' });

	/** change event */
	readonly wChange = output<SelectValue>();

	/** computed placeholder */
	readonly placeholder = computed(
		() =>
			(this.documents().length
				? 'Select language'
				: 'Create new language') + '...',
	);

	/** buttons (only visible if mutatable = true) */
	buttons = signal<SelectButton[]>([]);

	constructor(_lang: LanguageService) {
		super(languageForm, inject(FormService), _lang, 'language');

		this._languageService.loaded.pipe(take(1)).subscribe(() => {
			this.setDocuments();
		});

		effect(() => {
			if (this._languageService.language()?._id) {
				this.wModel.set(this._languageService.language()?._id);
			}

			if (this.isMutatable()) {
				const hasCurrent = !!this._languageService.language()?._id;

				this.buttons.set([
					{
						icon: hasCurrent ? 'edit' : '',
						click: () => this.mutate(true),
					},
					{
						icon: hasCurrent ? 'delete' : '',
						click: () => this.deleteCurrent(),
					},
					{
						icon: 'add',
						click: () => this.mutate(false),
					},
				]);
			}

			this._cdr.markForCheck();
		});
	}

	mutate(current = true) {
		const selectedId = (this.wModel() as string | null) ?? null;

		const docSig = current
			? this._languageService.getSignal(selectedId as string)
			: undefined;

		this._form.modal<Language>(
			languageForm,
			{
				label: current ? 'Update' : 'Create',
				click: (updated, close: () => void) => {
					if (current && this._languageService.language()) {
						this._languageService
							.update({
								...(this._languageService.language() as Language),
								...(updated as Partial<Language>),
							})
							.subscribe(() => {
								this.setDocuments();
							});
					} else {
						this._languageService
							.create(updated as Language)
							.subscribe((l) => {
								this.setDocuments();
								this._languageService.setLanguage(l);
								this.wModel.set(l._id as SelectValue);
								this.wChange.emit(l._id as SelectValue);
							});
					}

					close();
				},
			},
			docSig?.(),
		);
	}

	private deleteCurrent() {
		const curr = this._languageService.language() as Language | null;
		if (!curr) return;

		if (this._languageService.languages().length > 1) {
			this._languageService.nextLanguage();

			console.log(this._languageService.language());

			this.wModel.set(this._languageService.language()?._id);
		} else {
			this._languageService.setLanguageId();
		}

		this._languageService.delete(curr).subscribe(() => {
			this.setDocuments();
		});
	}
}
