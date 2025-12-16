import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GuestGuard {
	private router = inject(Router);

	canActivate(): boolean {
		if (localStorage.getItem('waw_user')) {
			this.router.navigateByUrl('/profile');

			return false;
		} else {
			return true;
		}
	}
}
