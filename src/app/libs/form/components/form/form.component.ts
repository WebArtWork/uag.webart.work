import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	inject,
	input,
	output,
	signal,
	untracked,
	WritableSignal,
} from '@angular/core';

import { FormcomponentService } from '@lib/form/services/formcomponent.service';
import { CoreService } from 'wacom';
import { FormComponentInterface } from '../../interfaces/component.interface';
import { FormInterface } from '../../interfaces/form.interface';
import { FormService, JsonSignalForm } from '../../services/form.service';
import { FormComponentComponent } from '../form-component/form-component.component';

@Component({
	selector: 'wform',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
	imports: [FormComponentComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
	private _coreService = inject(CoreService);
	private _formService = inject(FormService);
	private _formcomponentService = inject(FormcomponentService);

	readonly config = input.required<FormInterface>();
	readonly submition = input<Record<string, unknown> | null>({});

	readonly wChange = output<Record<string, unknown>>();
	readonly wSubmit = output<Record<string, unknown>>();

	/** All components from schema */
	private readonly _components = computed<FormComponentInterface[]>(() => {
		return this.config()?.components ?? [];
	});

	/** Filtered by hidden flag */
	readonly visibleComponents = computed<FormComponentInterface[]>(() =>
		this._components()
			.filter((c) => !c?.hidden)
			.concat(
				this._formcomponentService
					.components()
					.filter(
						(c) => c.formId === this.formId,
					) as FormComponentInterface[],
			),
	);

	/** Signal Form instance for this schema */
	readonly instance = signal<JsonSignalForm | null>(null);

	constructor() {
		// Create/attach Signal Form for this config + initial values
		effect(() => {
			const cfg = this.config();
			const initial = this.submition();

			if (!cfg) return;

			// Form creation installs internal effects; run outside reactive context
			const inst = untracked(() =>
				this._formService.form(cfg, initial ?? undefined),
			);
			this.instance.set(inst);
		});

		// Emit changes whenever model updates
		effect(() => {
			const inst = this.instance();
			if (!inst) return;

			const values = inst.model(); // subscribe to model signal
			this.wChange.emit(values);
		});
	}

	/** Stable id to use for CSS & template context */
	get formId(): string {
		return this.instance()?.id ?? '';
	}

	get fieldTree(): any {
		return this.instance()?.form ?? null;
	}

	get model(): WritableSignal<Record<string, unknown>> | null {
		return this.instance()?.model ?? null;
	}

	get title(): string | undefined {
		return this.config()?.title;
	}

	get cssClass(): string {
		return this.config()?.class ?? '';
	}

	onSubmit(): void {
		const inst = this.instance();
		const values = inst ? inst.model() : {};
		this.wSubmit.emit(values);
	}

	/** Kept for child compatibility – also emits full model */
	onLegacyChange(): void {
		const inst = this.instance();
		const values = inst ? inst.model() : {};
		// debounce a bit like old code did via CoreService
		this._coreService.afterWhile(
			this,
			() => this.wChange.emit(values),
			150,
		);
	}

	onClick(): void {
		// left as hook for templates that use wClick
	}
}
