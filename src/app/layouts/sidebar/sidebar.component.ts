import { Platform } from '@angular/cdk/platform';
import { TitleCasePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';
import { ButtonComponent } from '@lib/button';
import { TranslateDirective } from 'src/app/modules/translate/directives/translate.directive';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		RouterLink,
		TranslateDirective,
		MaterialComponent,
		TitleCasePipe,
		ButtonComponent,
	],
})
export class SidebarComponent {
	readonly userService = inject(UserService);
	readonly languageService = inject(LanguageService);
	private readonly platform = inject(Platform);

	open = input(false);

	close = output<void>();

	onClose(): void {
		this.close.emit();
	}

	onNav(): void {
		if (!this.platform.ANDROID && !this.platform.IOS) return;
		this.onClose();
	}
}
