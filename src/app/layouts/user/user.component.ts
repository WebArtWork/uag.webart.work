import { Platform } from '@angular/cdk/platform';
import { TitleCasePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	signal,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import { ButtonComponent } from '@lib/button';
import { BurgerComponent } from 'src/app/icons/burger/burger.component';
import { TranslateDirective } from 'src/app/modules/translate/directives/translate.directive';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './user.component.html',
	styleUrl: './user.component.scss',
	imports: [
		RouterOutlet,
		TranslateDirective,
		BurgerComponent,
		MaterialComponent,
		TitleCasePipe,
		RouterLink,
		TranslateDirective,
		ButtonComponent,
	],
})
export class UserComponent {
	readonly userService = inject(UserService);
	readonly languageService = inject(LanguageService);
	private readonly platform = inject(Platform);

	isOpen = signal(false);

	close(): void {
		this.isOpen.set(false);
	}

	closeIfDesktop(): void {
		if (!this.platform.ANDROID && !this.platform.IOS) this.close();
	}
}
