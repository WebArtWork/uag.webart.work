import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { CrudComponent } from 'wacom';
import { InputComponent } from '../../../../libs/input/input.component';
import { TableComponent } from '../../../../libs/table/table.component';
import { CellDirective } from '../../../../libs/table/table.directive';
import { userFormComponents } from '../../formcomponents/user.formcomponents';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent, CellDirective, InputComponent],
	templateUrl: './users.component.html',
})
export class UsersComponent extends CrudComponent<
	UserService,
	User,
	FormInterface
> {
	protected override configType: 'server' | 'local' = 'local';

	protected override allowUrl(): boolean {
		return false;
	}

	protected override async delete(doc: User) {
		this.userService.deleteAdmin(doc).subscribe(() => {
			this.setDocuments();
		});
	}

	private _router = inject(Router);

	userService = inject(UserService);

	readonly roles = this._router.url.includes('admin')
		? this.userService.roles
		: this.userService.employees;

	columns = ['name', 'email'];

	config = this.getConfig();

	constructor(
		_userService: UserService,
		_form: FormService,
		_formService: FormService,
	) {
		super(userFormComponents, _form, _userService, 'user');

		this.setDocuments();

		for (const role of this.userService.roles) {
			this.columns.push(role);
		}
	}
}
