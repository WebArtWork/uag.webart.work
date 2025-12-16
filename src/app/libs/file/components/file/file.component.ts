import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	TemplateRef,
	computed,
	inject,
	input,
	model,
} from '@angular/core';
import { fileToDataUrl } from '@lib/file/file.util';
import { ModalService } from '@lib/modal';
import { TranslatePipe } from 'src/app/modules/translate/pipes/translate.pipe';
import { fileDefaults } from '../../file.const';
import { FileService } from '../../file.service';
import { FileCropperComponent } from '../file-cropper/file-cropper.component';

export type FileMode =
	| 'single-image'
	| 'single-file'
	| 'multi-image'
	| 'multi-file';

export type FileView = 'dropzone' | 'list' | 'thumb-only';

@Component({
	selector: 'ngx-file',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, TranslatePipe],
	templateUrl: './file.component.html',
	styleUrl: './file.component.scss',
})
export class FileComponent {
	/** UI props */
	readonly label = input<string>(fileDefaults.label);
	readonly placeholder = input<string>(fileDefaults.placeholder);
	readonly disabled = input<boolean>(fileDefaults.disabled);
	readonly clearable = input<boolean>(fileDefaults.clearable);
	readonly accept = input<string>(fileDefaults.accept);
	readonly preview = input<boolean>(fileDefaults.preview);

	/** Behaviour */
	readonly mode = input<FileMode>(fileDefaults.mode as FileMode);
	readonly view = input<FileView>(fileDefaults.view as FileView);

	/** Optional crop box (for image modes) */
	readonly cropWidth = input<number | null>(fileDefaults.cropWidth);
	readonly cropHeight = input<number | null>(fileDefaults.cropHeight);

	/** Custom templates */
	readonly t_item = input<TemplateRef<unknown>>();
	readonly t_empty = input<TemplateRef<unknown>>();

	/** Back-end routing */
	readonly container = input<string>(fileDefaults.container);
	readonly name = input<string>(fileDefaults.name);

	/** Separate models for each mode */
	readonly wImage = model<string | null>(null, { alias: 'wImage' });
	readonly wFile = model<string | null>(null, { alias: 'wFile' });
	readonly wImages = model<string[]>([], { alias: 'wImages' });
	readonly wFiles = model<string[]>([], { alias: 'wFiles' });

	private readonly _modal = inject(ModalService);
	private readonly _fs = inject(FileService);

	readonly isDisabled = computed(() => this.disabled());
	readonly isMultiple = computed(() => this.mode().startsWith('multi-'));
	readonly isImageMode = computed(() => this.mode().includes('image'));

	/** Normalized list of URLs for rendering */
	readonly files = computed<string[]>(() => {
		const mode = this.mode();
		switch (mode) {
			case 'single-image':
				return this.wImage() ? [this.wImage() as string] : [];
			case 'single-file':
				return this.wFile() ? [this.wFile() as string] : [];
			case 'multi-image':
				return this.wImages();
			case 'multi-file':
				return this.wFiles();
			default:
				return [];
		}
	});

	triggerPick(input: HTMLInputElement): void {
		if (!this.isDisabled()) {
			input.click();
		}
	}

	isImage(src: string): boolean {
		return /\.(png|jpe?g|webp|gif)(\?|$)/i.test(src ?? '');
	}

	async onPicked(input: HTMLInputElement): Promise<void> {
		const list = input.files;
		if (!list || !list.length) return;

		const doCrop =
			this.isImageMode() && !!this.cropWidth() && !!this.cropHeight();
		const urls: string[] = [];
		const container = this.container();
		const name = this.name();

		for (let i = 0; i < list.length; i++) {
			const f = list.item(i)!;

			// Always read file as data URL
			const dataUrl = await fileToDataUrl(f);

			if (doCrop) {
				// Open crop modal for each image
				await new Promise<void>((resolve) => {
					this._modal.show({
						component: FileCropperComponent,
						size: 'big',
						dataUrl,
						width: this.cropWidth()!,
						height: this.cropHeight()!,
						uploadImage: (cropped: string) => {
							this._fs
								.uploadBase64(cropped, container, name)
								.then((url) => {
									urls.push(url);
									resolve();
								});
						},
					});
				});
			} else {
				const url = await this._fs.uploadBase64(
					dataUrl,
					container,
					name,
				);
				urls.push(url);
			}

			// If single mode, ignore extra files after first
			if (!this.isMultiple()) {
				break;
			}
		}

		this._applyNewUrls(urls);
		input.value = '';
	}

	removeAt(index: number): void {
		const mode = this.mode();

		if (mode === 'single-image') {
			this.wImage.set(null);
			return;
		}

		if (mode === 'single-file') {
			this.wFile.set(null);
			return;
		}

		// Multi modes
		const current = [...this.files()];
		current.splice(index, 1);

		if (mode === 'multi-image') {
			this.wImages.set(current);
		} else if (mode === 'multi-file') {
			this.wFiles.set(current);
		}
	}

	clear(): void {
		const mode = this.mode();
		if (mode === 'single-image') {
			this.wImage.set(null);
		} else if (mode === 'single-file') {
			this.wFile.set(null);
		} else if (mode === 'multi-image') {
			this.wImages.set([]);
		} else if (mode === 'multi-file') {
			this.wFiles.set([]);
		}
	}

	private _applyNewUrls(urls: string[]): void {
		const mode = this.mode();

		if (!urls.length) {
			return;
		}

		if (mode === 'single-image') {
			this.wImage.set(urls[0] ?? null);
			return;
		}

		if (mode === 'single-file') {
			this.wFile.set(urls[0] ?? null);
			return;
		}

		if (mode === 'multi-image') {
			this.wImages.set([...this.wImages(), ...urls]);
			return;
		}

		if (mode === 'multi-file') {
			this.wFiles.set([...this.wFiles(), ...urls]);
		}
	}
}
