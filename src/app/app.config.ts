import {
	importProvidersFrom,
	provideZonelessChangeDetection,
} from '@angular/core';
import {
	BrowserModule,
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';
import {
	PreloadAllModules,
	provideRouter,
	withInMemoryScrolling,
	withPreloading,
} from '@angular/router';
import { provideTinymce } from 'ngx-tinymce';
import { provideWacom } from 'wacom';
import { provideFormComponents } from './app.formcomponents';
import { routes } from './app.routes';
import { AdminsGuard } from './modules/user/guards/admins.guard';
import { AuthenticatedGuard } from './modules/user/guards/authenticated.guard';
import { GuestGuard } from './modules/user/guards/guest.guard';
import { tinymceConfig } from './tinymce.config';
import { wacomConfig } from './wacom.config';

export const appConfig = {
	providers: [
		provideZonelessChangeDetection(),
		provideFormComponents(),
		provideWacom(wacomConfig),
		provideTinymce(tinymceConfig),
		importProvidersFrom(BrowserModule),
		/* providers */
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard,
		provideRouter(
			routes,
			withPreloading(PreloadAllModules),
			withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
		),
		provideClientHydration(withEventReplay()),
	],
};
