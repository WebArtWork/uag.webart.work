import { environment } from '@env';
import { DEFAULT_NETWORK_CONFIG } from 'wacom';

export const wacomConfig = {
	store: {},
	http: {
		url: environment.url,
	},
	socket: environment.production,
	network: environment.production
		? DEFAULT_NETWORK_CONFIG
		: {
				...DEFAULT_NETWORK_CONFIG,
				endpoints: ['http://localhost:4200/status'],
			},
	meta: {
		warnMissingGuard: false,
		useTitleSuffix: true,
		defaults: {
			title: environment.meta.title,
			favicon: environment.meta.favicon,
			description: environment.meta.description,
			titleSuffix: ' | ' + environment.meta.title,
			'og:image': environment.meta.image,
		},
	},
};
