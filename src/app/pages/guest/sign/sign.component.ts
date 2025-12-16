import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import {
	form,
	pattern,
	required,
	schema,
	submit,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { environment } from '@env';
import { SpiderComponent } from '@icon/spider';
import { AlertService } from '@lib/alert';
import { ButtonComponent } from '@lib/button';
import { InputComponent } from '@lib/input';
import { User, UserService } from '@module/user';
import { HttpService } from 'wacom';

interface RespStatus {
	email: string;
	pass: string;
}

interface SignModel {
	email: string;
	password: string;
	resetPin: string;
}

const signSchema = schema<SignModel>((path) => {
	required(path.email, { message: 'Enter your email...' });

	pattern(path.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);

	required(path.password, { message: 'Enter your password...' });
});

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SpiderComponent, InputComponent, ButtonComponent],
	templateUrl: './sign.component.html',
	styleUrl: './sign.component.scss',
})
export class SignComponent {
	userService = inject(UserService);
	private _alertService = inject(AlertService);
	private _httpService = inject(HttpService);
	private _router = inject(Router);

	readonly logo = environment.sign.logo;

	// Signal form model
	signModel = signal<SignModel>({
		email: environment.sign.email,
		password: environment.sign.password,
		resetPin: '',
	});

	// Signal form tree (used by [field])
	signForm = form(this.signModel, signSchema);

	showCode = signal(false);

	// 🔒 Disable button while any core field is invalid
	readonly isSubmitDisabled = computed(() => {
		const formInvalid = this.signForm().invalid(); // root form validity

		if (!this.showCode()) {
			return formInvalid;
		}

		// when code step is shown, also require resetPin to be valid
		const resetPinField = this.signForm.resetPin();
		return formInvalid || resetPinField.invalid();
	});

	wFormSubmit() {
		submit(this.signForm, (formTree) => {
			const payload = formTree().value() as SignModel;

			if (this.showCode()) {
				this._change(payload);
			} else {
				this._submit(payload);
			}

			return Promise.resolve({} as any);
		});
	}

	private _submit(payload: SignModel) {
		this._httpService.post(
			'/api/user/status',
			payload,
			(resp: RespStatus) => {
				if (resp.email && resp.pass) this._login(payload);
				else if (resp.email) this._request(payload);
				else this._sign(payload);
			},
		);
	}

	private _login(payload: SignModel) {
		this._httpService.post(
			'/api/user/login',
			payload,
			this._set.bind(this),
		);
	}

	private _sign(payload: SignModel) {
		this._httpService.post('/api/user/sign', payload, this._set.bind(this));
	}

	private _request(payload: SignModel) {
		this._httpService.post('/api/user/request', payload, () => {
			this.showCode.set(true);

			this._alertService.info({
				text: 'Mail will be sent to your email',
			});
		});
	}

	private _change(payload: SignModel) {
		this._httpService.post('/api/user/change', payload, (resp: boolean) => {
			if (resp) {
				this._alertService.info({
					text: 'Password successfully changed',
				});
			} else {
				this._alertService.error({ text: 'Wrong code' });
			}

			this._login(payload);
		});
	}

	private _set(user: User) {
		if (!user) {
			this._alertService.error({ text: 'Something went wrong' });
			return;
		}

		const token = (user as unknown as { token: string }).token || '';
		if (token) this._httpService.set('token', token);

		localStorage.setItem('waw_user', JSON.stringify(user));
		this.userService.setUser(user);
		this.userService.get();
		this._router.navigateByUrl('/profile');
	}
}
