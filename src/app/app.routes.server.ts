import { RenderMode, type ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
	// prerendered routes
	{ path: '', renderMode: RenderMode.Prerender }, // '/'

	// everything else stays CSR-only
	{
		path: '**',
		renderMode: RenderMode.Client,
	},
];
