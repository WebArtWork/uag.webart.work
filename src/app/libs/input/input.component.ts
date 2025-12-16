import { NgClass } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	computed,
	input,
	model,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { Field } from '@angular/forms/signals';
import { TranslatePipe } from '@module/translate/pipes/translate.pipe';
import { ManualDisabledDirective, ManualTypeDirective } from 'wacom';
import { inputDefaults } from './input.const';
import { InputType, InputValue } from './input.type';

@Component({
	selector: 'winput',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		Field,
		NgClass,
		TranslatePipe,
		ManualTypeDirective,
		ManualDisabledDirective,
	],
	templateUrl: './input.component.html',
	styleUrl: './input.component.scss',
})
export class InputComponent implements AfterViewInit {
	/* ---------------- Signal forms ---------------- */
	readonly field = input<any | null>(null);

	/* ---------------- Template-model mode ---------------- */
	readonly wModel = model<InputValue | null>(null, { alias: 'wModel' });

	/* ---------------- Inputs (all via shared defaults) ---------------- */
	readonly type = input<InputType>(inputDefaults.type);
	readonly name = input(inputDefaults.name);
	readonly label = input(inputDefaults.label);
	readonly placeholder = input(inputDefaults.placeholder);
	readonly items = input<string[]>(inputDefaults.items); // radio/checkbox

	readonly disabled = input(inputDefaults.disabled);
	readonly focused = input(inputDefaults.focused);
	readonly clearable = input(inputDefaults.clearable);
	readonly wClass = input(inputDefaults.wClass);
	readonly autocomplete = input<string | null | undefined>(
		inputDefaults.autocomplete,
	);

	// Optional external error override
	readonly error = input<string | null>(inputDefaults.error);

	/* ---------------- Outputs ---------------- */
	readonly wChange = output<InputValue | null>();
	readonly wSubmit = output<void>();
	readonly wBlur = output<void>();

	/* ---------------- Internal state ---------------- */
	showPassword = signal(false);

	private readonly _inputEl =
		viewChild<ElementRef<HTMLInputElement>>('inputEl');

	/* ---------------- Derived state ---------------- */
	readonly fieldState = computed(() => {
		const f = this.field();
		return f ? f() : null;
	});

	readonly fieldError = computed<string | null>(() => {
		const explicit = this.error();
		if (explicit) return explicit;

		const state = this.fieldState();
		if (!state) return null;

		const touched =
			typeof state.touched === 'function' ? state.touched() : false;
		const dirty = typeof state.dirty === 'function' ? state.dirty() : false;
		const invalid =
			typeof state.invalid === 'function' ? state.invalid() : false;

		if (!(invalid && (touched || dirty))) {
			return null;
		}

		const rawErrors =
			typeof state.errors === 'function' ? state.errors() : null;

		if (!rawErrors) return null;

		const errorsArray = Array.isArray(rawErrors)
			? rawErrors
			: Object.values(rawErrors);

		if (!errorsArray.length) return null;

		const first = errorsArray[0] as any;
		if (!first) return null;

		if (typeof first === 'string') return first;
		if (first.message && typeof first.message === 'string') {
			return first.message;
		}

		return null;
	});

	/* ---------------- Lifecycle ---------------- */
	ngAfterViewInit() {
		if (this.focused() && this._inputEl()) {
			this._inputEl()!.nativeElement.focus();
		}
	}

	/* ---------------- Handlers ---------------- */
	onInput(event: Event, option?: string) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement;
		const nativeType = (target as HTMLInputElement).type;

		let value: InputValue | null = null;

		if (nativeType === 'checkbox' && target instanceof HTMLInputElement) {
			if (option != null && this.items().length && !this.field()) {
				const current = this.wModel() as InputValue;
				const list = Array.isArray(current)
					? [...(current as any[])]
					: [];
				const idx = list.indexOf(option);

				if (target.checked && idx === -1) {
					list.push(option);
				} else if (!target.checked && idx !== -1) {
					list.splice(idx, 1);
				}

				value = list as InputValue;
			} else {
				value = target.checked;
			}
		} else if (nativeType === 'radio') {
			value = option != null ? option : target.value;
		} else {
			value = target.value;
		}

		if (!this.field()) {
			this.wModel.set(value);
		}

		this.wChange.emit(value);
	}

	onBlur() {
		this.wBlur.emit();
	}

	onSubmit() {
		this.wSubmit.emit();
	}

	onClear() {
		if (!this.field()) {
			this.wModel.set(null);
		}
		this.wChange.emit(null);
		this.onSubmit();
		if (this._inputEl()) {
			this._inputEl()!.nativeElement.focus();
		}
	}

	/* ---------------- Utility ---------------- */
	getAutocompleteAttr(type: InputType): string | null {
		const auto = this.autocomplete();
		if (auto !== undefined && auto !== null) return auto;
		return type === 'password' ? 'current-password' : null;
	}

	isItemChecked(item: any): boolean {
		const model = this.wModel();
		return Array.isArray(model) ? (model as any[]).includes(item) : !!model;
	}
}
