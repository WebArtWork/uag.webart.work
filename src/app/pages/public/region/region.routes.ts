import { Routes } from '@angular/router';
import { RegionComponent } from './region.component';

export const regionRoutes: Routes = [
	{
		path: ':id',
		component: RegionComponent,
	},
];
