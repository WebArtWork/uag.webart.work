import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
} from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
	selector: 'app-file-cropper',
	templateUrl: './file-cropper.component.html',
	styleUrl: './file-cropper.component.scss',
	imports: [ImageCropperComponent, ButtonComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileCropperComponent {
	// Provided by modal
	close: () => void = () => {};
	uploadImage: (croppedDataUrl: string) => void = () => {};

	// Cropper config
	maintainAspectRatio = true;
	aspectRatio = 1;

	// Data from caller
	dataUrl = '';
	width = 0;
	height = 0;

	// Result
	croppedDataUrl = '';

	/** Dynamic UI size (square) that always fits viewport */
	uiSize = 320;

	constructor() {
		this.updateUiSize();
	}

	@HostListener('window:resize')
	updateUiSize(): void {
		const vw = window.innerWidth || 0;
		const vh = window.innerHeight || 0;

		// keep some margins so buttons fit and no modal scroll appears
		const shorterSide = Math.min(vw, vh);
		const maxSize = Math.max(240, shorterSide - 240); // 240px total padding/margins
		this.uiSize = maxSize;
	}

	imageCropped(event: ImageCroppedEvent): void {
		this.croppedDataUrl = (event.base64 as string) || '';
	}
}
