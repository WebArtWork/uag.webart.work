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
				path: 'faq',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Faq'
					}
				},
				loadChildren: () => import('./pages/public/faq/faq.routes').then(m => m.faqRoutes)
			}, 
			{
				path: 'governance',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Governance'
					}
				},
				loadChildren: () => import('./pages/public/governance/governance.routes').then(m => m.governanceRoutes)
			}, 
			{
				path: 'region',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Region'
					}
				},
				loadChildren: () => import('./pages/public/region/region.routes').then(m => m.regionRoutes)
			}, 
			{
				path: 'regions',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Regions'
					}
				},
				loadChildren: () => import('./pages/public/regions/regions.routes').then(m => m.regionsRoutes)
			}, 
			{
				path: 'about',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'About'
					}
				},
				loadChildren: () => import('./pages/public/about/about.routes').then(m => m.aboutRoutes)
			}, 
			{
				path: 'land',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Land'
					}
				},
				loadChildren: () => import('./pages/public/land/land.routes').then(m => m.landRoutes)
			}, 
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
				path: 'citizen',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Citizen'
					}
				},
				loadChildren: () => import('./pages/user/citizen/citizen.routes').then(m => m.citizenRoutes)
			}, 
			{
				path: 'transaction',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Transaction'
					}
				},
				loadChildren: () => import('./pages/user/transaction/transaction.routes').then(m => m.transactionRoutes)
			}, 
			{
				path: 'transactions',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Transactions'
					}
				},
				loadChildren: () => import('./pages/user/transactions/transactions.routes').then(m => m.transactionsRoutes)
			}, 
			{
				path: 'dashboard',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Dashboard'
					}
				},
				loadChildren: () => import('./pages/user/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
			}, 
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
