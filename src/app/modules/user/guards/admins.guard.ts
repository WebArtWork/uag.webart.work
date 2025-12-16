import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AdminsGuard {
	private router = inject(Router);

	canActivate(): boolean {
		if (localStorage.getItem('waw_user')) {
			const user = JSON.parse(localStorage.getItem('waw_user') as string);

			if (user.is && user.is.admin) return true;

			this.router.navigateByUrl('/profile');

			return false;
		} else {
			this.router.navigateByUrl('/sign');

			return false;
		}
	}
}
