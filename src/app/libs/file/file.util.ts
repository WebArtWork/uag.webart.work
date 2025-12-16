import { ImageResizeBounds } from './file.interface';

/**
 * Read a File as base64 data URL.
 */
export function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;

		reader.readAsDataURL(file);
	});
}

/**
 * Resize an image file so it fits within given bounds, preserving aspect ratio.
 * Returns a base64 data URL (or the original if no resize is needed / not image).
 */
export async function resizeImageToBounds(
	file: File,
	bounds: ImageResizeBounds,
): Promise<string> {
	const original = await fileToDataUrl(file);

	// Not an image → just return original
	if (!file.type.startsWith('image/')) {
		return original;
	}

	return new Promise((resolve) => {
		const img = new Image();

		img.onload = () => {
			const maxW = bounds.width || 1920;
			const maxH = bounds.height || 1080;

			// Already within bounds → no resize
			if (img.width <= maxW && img.height <= maxH) {
				resolve(original);
				return;
			}

			const infoRatio = maxW / maxH;
			const imgRatio = img.width / img.height;

			let width: number;
			let height: number;

			if (imgRatio > infoRatio) {
				width = Math.min(maxW, img.width);
				height = width / imgRatio;
			} else {
				height = Math.min(maxH, img.height);
				width = height * imgRatio;
			}

			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext('2d');
			ctx?.drawImage(img, 0, 0, width, height);

			const resized = canvas.toDataURL('image/jpeg', 1);
			resolve(resized);
		};

		img.src = original;
	});
}
