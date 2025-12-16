import { Routes } from '@angular/router';
import { MetaGuard } from 'wacom';
import { AdminsGuard } from './modules/user/guards/admins.guard';
import { AuthenticatedGuard } from './modules/user/guards/authenticated.guard';
import { GuestGuard } from './modules/user/guards/guest.guard';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layouts/public/public.component').then(
				(m) => m.PublicComponent,
			),
		children: [
			/* public */
			{
				path: '',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components',
					},
				},
				loadChildren: () =>
					import('./pages/public/components/components.routes').then(
						(m) => m.componentsRoutes,
					),
			},
		],
	},
	{
		path: '',
		canActivate: [GuestGuard],
		loadComponent: () =>
			import('./layouts/guest/guest.component').then(
				(m) => m.GuestComponent,
			),
		children: [
			/* guest */
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign',
					},
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.routes').then(
						(m) => m.routes,
					),
			},
		],
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		loadComponent: () =>
			import('./layouts/user/user.component').then(
				(m) => m.UserComponent,
			),
		children: [
			/* user */
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile',
					},
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'birds',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign',
					},
				},
				loadChildren: () =>
					import('./modules/bird/pages/birds/birds.routes').then(
						(m) => m.routes,
					),
			},
		],
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		loadComponent: () =>
			import('./layouts/user/user.component').then(
				(m) => m.UserComponent,
			),
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users',
					},
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'clients',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clients',
					},
				},
				loadChildren: () =>
					import('./modules/user/pages/clients/clients.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms',
					},
				},
				loadChildren: () =>
					import('./libs/form/pages/forms/forms.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'form/:formId',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms',
					},
				},
				loadChildren: () =>
					import('./libs/form/pages/form/form.routes').then(
						(m) => m.routes,
					),
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates',
					},
				},
				loadChildren: () =>
					import(
						'./modules/translate/pages/translates/translates.routes'
					).then((m) => m.routes),
			},
		],
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full',
	},
];
