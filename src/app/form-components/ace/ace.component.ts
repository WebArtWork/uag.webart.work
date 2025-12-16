import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { AceComponent, AceConfigInterface } from 'ngx-ace-signal';
import { FormService } from 'src/app/libs/form/services/form.service';

interface Interface {}

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
	// keep empty if you don’t want global defaults
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './ace.component.html',
	styleUrl: './ace.component.scss',
	imports: [NgClass, AceComponent],
})
export class AceFormComponent implements OnInit {
	private readonly _form = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<Interface>>('templateRef');

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Ace', this.templateRef());
	}

	/* ------------ value bridge (Signal Forms + legacy) ------------ */

	getValue(data: any): string {
		const key = (data?.key as string | null) ?? null;

		// Signal Forms field (preferred)
		if (data?.field) {
			try {
				const state = data.field();
				if (state?.value && typeof state.value === 'function') {
					return (state.value() as string) ?? '';
				}
			} catch {
				// fall through
			}
		}

		// Model signal
		if (data?.model && typeof data.model === 'function' && key) {
			const current = data.model() as Record<string, unknown>;
			return (current?.[key] as string) ?? '';
		}

		// Legacy submission object
		if (!key || !data?.submition) return '';
		return (data.submition[key] as string) ?? '';
	}

	onValueChange(data: any, value: string): void {
		const key = (data?.key as string | null) ?? null;

		// 1) Signal Forms field
		if (data?.field) {
			try {
				const state = data.field();
				if (state?.value?.set) state.value.set(value);
			} catch {
				// ignore and fall through
			}
		}
		// 2) Model signal
		else if (
			data?.model &&
			typeof data.model.update === 'function' &&
			key
		) {
			data.model.update((current: Record<string, unknown>) => ({
				...current,
				[key]: value,
			}));
		}
		// 3) Legacy submission object
		else if (data?.submition && key) {
			data.submition[key] = value;
		}

		if (typeof data?.wChange === 'function') data.wChange();
	}

	/* ------------ config / props helpers ------------ */

	getConfig(data: any): AceConfigInterface {
		const props = (data?.props ?? {}) as Record<string, unknown>;
		const config: AceConfigInterface = { ...DEFAULT_ACE_CONFIG };

		const toNumber = (v: unknown): number | undefined => {
			if (v === null || v === undefined || v === '') return undefined;
			const n = Number(v);
			return Number.isNaN(n) ? undefined : n;
		};

		// Layout
		const minLines = toNumber(props['minLines']);
		const maxLines = toNumber(props['maxLines']);
		const tabSize = toNumber(props['tabSize']);

		if (
			props['fontSize'] !== undefined &&
			props['fontSize'] !== null &&
			props['fontSize'] !== ''
		) {
			config.fontSize = String(props['fontSize']);
		}
		if (minLines !== undefined) config.minLines = minLines;
		if (maxLines !== undefined) config.maxLines = maxLines;
		if (tabSize !== undefined) config.tabSize = tabSize;

		// Behavior toggles
		if (typeof props['useSoftTabs'] === 'boolean')
			config.useSoftTabs = props['useSoftTabs'];
		if (typeof props['wrap'] === 'boolean') config.wrap = props['wrap'];
		if (typeof props['showLineNumbers'] === 'boolean')
			config.showLineNumbers = props['showLineNumbers'];
		if (typeof props['showGutter'] === 'boolean')
			config.showGutter = props['showGutter'];
		if (typeof props['highlightActiveLine'] === 'boolean')
			config.highlightActiveLine = props['highlightActiveLine'];
		if (typeof props['showPrintMargin'] === 'boolean')
			config.showPrintMargin = props['showPrintMargin'];
		if (typeof props['readOnly'] === 'boolean')
			config.readOnly = props['readOnly'];
		if (typeof props['useWorker'] === 'boolean')
			config.useWorker = props['useWorker'];

		// Local config object from props
		const localConfig = props['config'];
		if (
			localConfig &&
			typeof localConfig === 'object' &&
			!Array.isArray(localConfig)
		) {
			Object.assign(config, localConfig as Partial<AceConfigInterface>);
		}

		// Per-field config (code-level override)
		const fieldConfig = data?.field?.Config;
		if (
			fieldConfig &&
			typeof fieldConfig === 'object' &&
			!Array.isArray(fieldConfig)
		) {
			Object.assign(config, fieldConfig as Partial<AceConfigInterface>);
		}

		// Extra config JSON string
		const configJson = props['configJson'];
		if (typeof configJson === 'string' && configJson.trim()) {
			try {
				const json: unknown = JSON.parse(configJson);
				if (json && typeof json === 'object' && !Array.isArray(json)) {
					Object.assign(config, json as Partial<AceConfigInterface>);
				}
			} catch {
				// invalid JSON -> ignore
			}
		}

		return config;
	}

	getMode(data: any): string {
		const propsMode = data?.props?.mode;
		const fieldMode = data?.field?.Mode;

		if (propsMode) return String(propsMode);
		if (fieldMode) return String(fieldMode);

		return 'text';
	}

	getTheme(data: any): string {
		const propsTheme = data?.props?.theme;
		const fieldTheme = data?.field?.Theme;

		if (propsTheme) return String(propsTheme);
		if (fieldTheme) return String(fieldTheme);

		return 'github';
	}

	isDisabled(data: any): boolean {
		return !!(
			data?.props?.disabled ||
			data?.component?.disabled ||
			data?.field?.Disabled
		);
	}

	getUseAceClass(data: any): boolean {
		const prop = data?.props?.useAceClass;
		if (typeof prop === 'boolean') return prop;

		const field = data?.field?.UseAceClass;
		if (typeof field === 'boolean') return field;

		return true;
	}
}
