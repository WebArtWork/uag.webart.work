import {
	inject,
	Injectable,
	Injector,
	runInInjectionContext,
	signal,
	TemplateRef,
	WritableSignal,
} from '@angular/core';
import { form as buildSignalForm, required } from '@angular/forms/signals';
import { environment } from 'src/environments/environment';
import { CrudService, StoreService } from 'wacom';

import { FormComponentInterface } from '../interfaces/component.interface';
import { Form, FormInterface } from '../interfaces/form.interface';
import { ModalFormComponent } from '../modals/modal-form/modal-form.component';
import { ModalUniqueComponent } from '../modals/modal-unique/modal-unique.component';

// Virtual manager (new)
import { Modal, ModalService } from '@lib/modal';

export interface FormModalButton {
	click: (submition: unknown, close: () => void) => void;
	label: string;
	class?: string;
}

export interface JsonSignalForm {
	id: string;
	model: WritableSignal<Record<string, unknown>>;
	form: any; // Signal Forms FieldTree, dynamic keys so we keep it as any
}

@Injectable({ providedIn: 'root' })
export class FormService extends CrudService<Form> {
	private _modalService = inject(ModalService);
	private _storeService = inject(StoreService);
	private _injector = inject(Injector);

	/** Application ID from the environment configuration */
	readonly appId = (environment as unknown as { appId: string }).appId;

	constructor() {
		super({
			name: 'form',
		});

		// restore known form IDs
		this._storeService.getJson('formIds', (formIds: unknown) => {
			if (Array.isArray(formIds)) this.formIds.set(formIds);
		});

		this.get({
			query: 'appId=' + environment.appId,
		});
	}

	/* --------------------------------------------------------------------------------------
	   Template registry (name -> <ng-template>) + reactive bump.
	   Templates are now provided via app.formcomponents.ts (APP_INITIALIZER).
	   -------------------------------------------------------------------------------------- */
	private _templateComponent = new Map<string, TemplateRef<unknown>>();
	/** Bumps whenever a template is registered/unregistered to notify listeners */
	readonly templatesVersion = signal(0);

	addTemplateComponent<T>(name: string, template: TemplateRef<T>): void {
		if (!this._templateComponent.has(name)) {
			this._templateComponent.set(
				name,
				template as unknown as TemplateRef<unknown>,
			);
			this.templatesVersion.update((v) => v + 1);
		}
	}

	removeTemplateComponent(name: string): void {
		if (this._templateComponent.delete(name)) {
			this.templatesVersion.update((v) => v + 1);
		}
	}

	getTemplateComponent(name: string): TemplateRef<unknown> | null {
		return this._templateComponent.get(name) ?? null;
	}

	getTemplateComponentsNames(): string[] {
		return Array.from(this._templateComponent.keys());
	}

	/* --------------------------------------------------------------------------------------
	   (Legacy helper API) “template fields”
	   Still available for builders / editors; runtime prefers props.
	   -------------------------------------------------------------------------------------- */
	templateFields: Record<string, string[]> = {};
	customTemplateFields: Record<string, Record<string, string>> = {};

	getTemplateFields(name: string): string[] {
		return this.templateFields[name] || ['Placeholder', 'Label'];
	}

	setTemplateFields(
		name: string,
		fields: string[],
		customFields: Record<string, string> = {},
	): void {
		this.templateFields[name] = fields;
		this.customTemplateFields[name] = {
			...(this.customTemplateFields[name] || {}),
			...customFields,
		};
	}

	getCustomTemplateFields(name: string): Record<string, string> {
		return this.customTemplateFields[name] || {};
	}

	/* --------------------------------------------------------------------------------------
	   Public state
	   -------------------------------------------------------------------------------------- */
	forms: FormInterface[] = [];

	formIds = signal<string[]>([]);

	/** Internal registry: formId -> Signal Form instance */
	private _signalForms = new Map<string, JsonSignalForm>();

	/* --------------------------------------------------------------------------------------
	   Defaults / builders (using props)
	   -------------------------------------------------------------------------------------- */
	getDefaultForm(
		formId: string,
		keys = ['name', 'description'],
	): FormInterface {
		this._rememberFormId(formId);

		const components: FormComponentInterface[] = keys.map((fullKey, i) => {
			const base = fullKey.includes('.') ? fullKey.split('.')[1] : 'Text';
			const label = (fullKey.split('.')[0] || fullKey).replace(
				/\[\]|\[\d+\]/g,
				'',
			);

			return {
				name: base,
				key: fullKey,
				focused: i === 0,
				props: {
					placeholder: `Enter your ${label}`,
					label: label.charAt(0).toUpperCase() + label.slice(1),
				},
			};
		});

		return { formId, components };
	}

	/* --------------------------------------------------------------------------------------
	   Signal Forms: JSON schema -> Signal Form
	   -------------------------------------------------------------------------------------- */

	/**
	 * Main entry: get or create a Signal Form instance for the given schema.
	 * Also merges `initial` into the model if provided.
	 */
	form(
		form: FormInterface,
		initial?: Record<string, unknown>,
	): JsonSignalForm {
		if (form.formId) {
			this._rememberFormId(form.formId);
		}

		const id = (form.formId as string) || crypto.randomUUID();

		form.formId = id;

		const existing = this._signalForms.get(id);
		if (existing) {
			if (initial && Object.keys(initial).length) {
				existing.model.update((current) => ({
					...current,
					...initial,
				}));
			}
			return existing;
		}

		const modelValue = this._buildInitialModel(form, initial ?? {});
		const model = signal<Record<string, unknown>>(modelValue);

		// Signal Forms require an injection context; run creation inside the service injector
		const formTree = runInInjectionContext(this._injector, () =>
			buildSignalForm(model, (schema) => {
				this._applyValidators(schema, form);
			}),
		);

		const instance: JsonSignalForm = {
			id,
			model,
			form: formTree,
		};

		this._signalForms.set(id, instance);
		return instance;
	}

	private _buildInitialModel(
		form: FormInterface,
		initial: Record<string, unknown> = {},
	): Record<string, unknown> {
		const model: Record<string, unknown> = { ...initial };

		this._traverseComponents(form.components, (component) => {
			if (!component.key) return;
			if (!(component.key in model)) {
				model[component.key] = null;
			}
		});

		return model;
	}

	private _applyValidators(schema: any, form: FormInterface): void {
		this._traverseComponents(form.components, (component) => {
			if (!component.key) return;

			const field = (schema as any)[component.key];
			if (!field) return;

			const label =
				(component.props?.['label'] as string | undefined) ??
				component.key;

			if (component.required) {
				required(field, {
					message: `${label} is required`,
				});
			}

			// place for more rules from props, e.g. minLength/maxLength/etc.
		});
	}

	private _traverseComponents(
		components: FormComponentInterface[] | undefined,
		visitor: (component: FormComponentInterface) => void,
	): void {
		if (!components?.length) return;

		for (const component of components) {
			visitor(component);

			if (component.components?.length) {
				this._traverseComponents(component.components, visitor);
			}
		}
	}

	/* --------------------------------------------------------------------------------------
	   Modal helpers (wire Signal Forms automatically)
	   -------------------------------------------------------------------------------------- */

	modal<T>(
		form: FormInterface | FormInterface[],
		buttons: FormModalButton | FormModalButton[] = [],
		submition: unknown = { data: {} },
		change: (update: T) => void | Promise<(update: T) => void> = (
			_u: T,
		): void => {},
		modalOptions: unknown = {},
	): Promise<T> {
		const forms = Array.isArray(form) ? form : [form];

		// Ensure Signal Form exists for each schema
		forms.forEach((f) => this.form(f, submition as any));

		return new Promise((resolve) => {
			this._modalService.show({
				...(modalOptions as Modal),
				component: ModalFormComponent,
				class: 'forms_modalService',
				size: 'big',
				form,
				modalButtons: Array.isArray(buttons) ? buttons : [buttons],
				submition,
				onClose: () => resolve(submition as T),
				submit: (update: T) => resolve(update),
				change: (update: T) => {
					if (typeof change === 'function') change(update);
				},
			});
		});
	}

	modalDocs<T>(
		docs: T[],
		title = 'Modify content of documents',
	): Promise<T[]> {
		return new Promise((resolve) => {
			const submition = {
				docs: JSON.stringify(docs.length ? docs : [], null, 4),
			};

			this._modalService.show({
				component: ModalFormComponent,
				class: 'forms_modalService',
				size: 'big',
				submition,
				form: {
					title,
					components: [
						{
							name: 'Ace',
							key: 'docs',
							props: {
								placeholder: 'Fill content of documents...',
							},
						},
					],
				},
				modalButtons: [
					{
						label: 'Update',
						click: (
							_submition: Record<string, unknown>,
							close: () => void,
						) => {
							close();

							const out: T[] = submition.docs
								? JSON.parse(submition.docs)
								: [];

							resolve(out);
						},
					},
				],
			});
		});
	}

	modalUnique<T>(
		module: string,
		field: string,
		doc: T,
		component: string = '',
		onClose: () => void | Promise<() => void> = (): void => {},
	): void {
		const form = this.getDefaultForm('unique', [
			field + (component ? '.' + component : ''),
		]);

		this.form(form, doc as any);

		this._modalService.show({
			component: ModalUniqueComponent,
			form,
			module,
			field,
			doc,
			class: 'forms_modalService',
			onClose,
		});
	}

	/* --------------------------------------------------------------------------------------
	   Schema utilities (props-based)
	   -------------------------------------------------------------------------------------- */

	getComponent(form: FormInterface, key: string): FormComponentInterface {
		return this._getComponent(form.components, key) || ({} as any);
	}

	getProp<T = unknown>(
		form: FormInterface,
		key: string,
		prop: string,
	): T | null {
		const comp = this.getComponent(form, key);
		return (comp?.props?.[prop] as T) ?? null;
	}

	setProp(
		form: FormInterface,
		key: string,
		prop: string,
		value: unknown,
	): void {
		const comp = this.getComponent(form, key);
		if (!comp) return;

		comp.props = comp.props || {};
		comp.props[prop] = value;
	}

	private _getComponent(
		components: FormComponentInterface[] = [],
		key: string,
	): FormComponentInterface | null {
		for (const component of components || []) {
			if (component.key === key) return component;
			if (component.components?.length) {
				const found = this._getComponent(component.components, key);
				if (found) return found;
			}
		}
		return null;
	}

	/* --------------------------------------------------------------------------------------
	   Internal helpers
	   -------------------------------------------------------------------------------------- */

	private _rememberFormId(formId: string) {
		if (!formId) return;

		if (!this.formIds().includes(formId)) {
			this.formIds.update((formIds) => {
				formIds.push(formId);

				return formIds;
			});

			this._storeService.setJson('formIds', this.formIds());
		}
	}
}
