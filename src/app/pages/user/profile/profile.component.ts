import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { form, submit } from '@angular/forms/signals';
import { AlertService } from '@lib/alert';
import { ButtonComponent } from '@lib/button';
import { FileComponent } from '@lib/file';
import { InputComponent } from '@lib/input';
import { UserService } from '@module/user';
import { EmitterService } from 'wacom';
import { ProfileModel, SecurityModel } from './profile.interface';
import { profileSchema, securitySchema } from './profile.schema';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [InputComponent, ButtonComponent, FileComponent],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	readonly userService = inject(UserService);
	private readonly _emitterService = inject(EmitterService);
	private readonly _alertService = inject(AlertService);

	readonly activeTab = signal<'profile' | 'security'>('profile');

	// Profile
	profileModel = signal<ProfileModel>({
		name: this.userService.user().name || '',
		phone: this.userService.user().phone || '',
		bio: this.userService.user().bio || '',
	});

	profileForm = form(this.profileModel, profileSchema);

	readonly isSubmitDisabled = computed(() => this.profileForm().invalid());

	// Security
	securityModel = signal<SecurityModel>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	securityForm = form(this.securityModel, securitySchema);

	readonly isSecurityDisabled = computed(
		() =>
			this.securityForm().invalid() ||
			this.securityModel().newPassword !==
				this.securityModel().confirmPassword,
	);

	constructor() {
		this._emitterService.onComplete('us.user').subscribe(() => {
			const user = this.userService.user();

			this.profileModel.set({
				name: user.name || '',
				phone: user.phone || '',
				bio: user.bio || '',
			});

			this.profileForm().reset();
		});
	}

	setTab(tab: 'profile' | 'security'): void {
		this.activeTab.set(tab);
	}

	wFormSubmit(): void {
		submit(this.profileForm, (formTree) => {
			this.userService.user.set({
				...this.userService.user(),
				...(formTree().value() as ProfileModel),
			});

			this.userService.updateMe();

			return Promise.resolve();
		});
	}

	wSecuritySubmit(): void {
		submit(this.securityForm, (formTree) => {
			const payload = formTree().value() as SecurityModel;

			this.userService
				.changePassword(payload.currentPassword, payload.newPassword)
				.subscribe({
					next: () => {
						this.securityForm().reset();

						this.securityModel.set({
							currentPassword: '',
							newPassword: '',
							confirmPassword: '',
						});
					},
				});

			return Promise.resolve();
		});
	}

	updateThumb(thumb: string) {
		this.userService.user.set({
			...this.userService.user(),
			thumb: thumb,
		});

		this.userService.thumb.set(thumb);

		this.userService.updateMe();
	}
}
