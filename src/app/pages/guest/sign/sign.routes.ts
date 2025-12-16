import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./sign.component').then((m) => m.SignComponent),
	},
];
