import { Injectable, inject } from '@angular/core';
import { CrudService, HttpService } from 'wacom';
import { File } from './file.interface';

@Injectable({ providedIn: 'root' })
export class FileService extends CrudService<File> {
	private readonly _http = inject(HttpService);

	constructor() {
		super({ name: 'file' });
	}

	/**
	 * Upload base64 (data URL) to backend with optional container/name.
	 * Returns a URL string from the API.
	 */
	async uploadBase64(
		dataUrl: string,
		container = 'general',
		name = '',
	): Promise<string> {
		return await new Promise<string>((resolve) => {
			this._http.post(
				'/api/file/photo',
				{ container, name, dataUrl },
				(url: string) => resolve(url),
			);
		});
	}
}
