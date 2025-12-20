import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	imports: [RouterOutlet, HeaderComponent, SidebarComponent],
})
export class UserComponent {
	isOpen = signal(false);

	toggleMenu(): void {
		this.isOpen.update((v) => !v);
	}

	closeMenu(): void {
		this.isOpen.set(false);
	}
}
