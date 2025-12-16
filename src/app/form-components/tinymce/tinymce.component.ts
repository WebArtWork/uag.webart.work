import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TinymceComponent } from 'ngx-tinymce';
import { FormService } from 'src/app/libs/form/services/form.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tinymce.component.html',
	styleUrl: './tinymce.component.scss',
	imports: [NgClass, FormsModule, TinymceComponent],
})
export class TinymceFormComponent implements OnInit {
	private readonly _form = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<unknown>>('templateRef');

	ngOnInit(): void {
		this._form.addTemplateComponent('Tinymce', this.templateRef());
	}

	/** Read current value: prefer Signal Form field, fallback to raw submition. */
	getValue(data: any): string {
		const key = data.key as string | null;
		if (data.field) {
			try {
				const state = data.field();
				if (state?.value && typeof state.value === 'function') {
					return state.value() ?? '';
				}
			} catch {
				// fall through to submition
			}
		}
		if (!key || !data.submition) return '';
		return (data.submition[key] as string) ?? '';
	}

	/** Bridge TinyMCE -> Signal Forms (field/model) + legacy submition. */
	onValueChange(data: any, value: string): void {
		const key = data.key as string | null;

		// 1) Signal Forms field (preferred)
		if (data.field) {
			try {
				const state = data.field();
				if (state?.value?.set) {
					state.value.set(value);
				}
			} catch {
				// ignore and fall through
			}
		}
		// 2) Fallback to model signal if present
		else if (data.model && typeof data.model.update === 'function' && key) {
			data.model.update((current: Record<string, unknown>) => ({
				...current,
				[key]: value,
			}));
		}
		// 3) Legacy: mutate submition object
		else if (data.submition && key) {
			data.submition[key] = value;
		}

		// Notify wform so it can emit debounced change + keep Modal submition in sync
		if (typeof data.wChange === 'function') {
			data.wChange();
		}
	}

	// ---- Props helpers (all via component.props) -----------------------------

	getConfig(data: any): any {
		const props = (data && data.props) || {};

		const toNumber = (v: unknown): number | undefined => {
			if (v === null || v === undefined || v === '') return undefined;
			const n = Number(v);
			return Number.isNaN(n) ? undefined : n;
		};

		// Base config from simple props
		const config: any = {};

		// Layout
		const height = toNumber(props.height);
		const minHeight = toNumber(props.minHeight);
		const maxHeight = toNumber(props.maxHeight);
		if (height !== undefined) config.height = height;
		if (minHeight !== undefined) config.min_height = minHeight;
		if (maxHeight !== undefined) config.max_height = maxHeight;

		// Toggles
		if (typeof props.menubar === 'boolean') {
			config.menubar = props.menubar;
		}
		if (typeof props.statusbar === 'boolean') {
			config.statusbar = props.statusbar;
		}
		if (typeof props.branding === 'boolean') {
			config.branding = props.branding;
		}
		if (typeof props.pasteAsText === 'boolean') {
			config.paste_as_text = props.pasteAsText;
		}

		// Toolbar presets
		if (props.toolbarPreset) {
			const preset = String(props.toolbarPreset);
			const toolbarMap: Record<string, string> = {
				basic: 'undo redo | bold italic underline | bullist numlist | link',
				standard:
					'undo redo | styles | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table',
				full: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | forecolor backcolor | removeformat',
			};
			if (preset !== 'custom' && toolbarMap[preset]) {
				config.toolbar = toolbarMap[preset];
			}
		}

		// Plugins presets
		if (props.pluginsPreset) {
			const preset = String(props.pluginsPreset);
			const pluginsMap: Record<string, string> = {
				minimal: 'lists link',
				standard: 'lists link image table code',
				media: 'lists link image media table code',
				all: 'advlist anchor autolink charmap code emoticons image link lists media searchreplace table visualblocks wordcount',
			};
			if (preset !== 'custom' && pluginsMap[preset]) {
				config.plugins = pluginsMap[preset];
			}
		}

		// Content behavior
		if (props.forceRootBlock) {
			const value = String(props.forceRootBlock);
			if (value === 'false') {
				config.forced_root_block = false;
			} else if (value === 'default') {
				// let TinyMCE decide; do not set
			} else {
				config.forced_root_block = value;
			}
		}

		// Uploads / assets
		if (props.imageUploadUrl) {
			config.images_upload_url = String(props.imageUploadUrl);
		}

		// Styling
		if (props.contentCss) {
			config.content_css = String(props.contentCss);
		}
		if (props.contentStyle) {
			config.content_style = String(props.contentStyle);
		}
		if (props.bodyClass) {
			config.body_class = String(props.bodyClass);
		}

		// Localization
		if (props.language) {
			config.language = String(props.language);
		}
		if (props.skin) {
			config.skin = String(props.skin);
		}

		// Raw config (object)
		if (props.config && typeof props.config === 'object') {
			Object.assign(config, props.config as Record<string, unknown>);
		}

		// Raw config JSON (string)
		if (typeof props.configJson === 'string' && props.configJson.trim()) {
			try {
				const json = JSON.parse(props.configJson);
				if (json && typeof json === 'object') {
					Object.assign(config, json);
				}
			} catch {
				// invalid JSON -> silently ignore, keep safe
			}
		}

		return config;
	}

	isDisabled(data: any): boolean {
		return (data.props?.disabled as boolean) ?? false;
	}

	isInline(data: any): boolean {
		return (data.props?.inline as boolean) ?? false;
	}

	getPlaceholder(data: any): string {
		return (data.props?.placeholder as string) ?? '';
	}
}
