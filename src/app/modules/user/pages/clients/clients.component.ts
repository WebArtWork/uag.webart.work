import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';
import { FormService } from 'src/app/libs/form/services/form.service';
import { TableComponent } from 'src/app/libs/table/table.component';
import { CrudComponent } from 'wacom';
import { userFormComponents } from '../../formcomponents/user.formcomponents';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TableComponent],
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent extends CrudComponent<
	UserService,
	User,
	FormInterface
> {
	/** Use server-side pagination for clients */
	protected override configType: 'server' | 'local' = 'server';

	/** Basic columns for clients table */
	columns = ['name', 'email'];

	/** wtable config built by CrudComponent, aware of server mode */
	config = this.getConfig();

	protected override allowUrl(): boolean {
		// no URL-driven filters for now, same as UsersComponent
		return false;
	}

	constructor(
		_userService: UserService,
		_form: FormService,
		_formService: FormService,
	) {
		// 'user' docType reuses existing user form components
		super(userFormComponents, _form, _userService, 'user');

		// fetch first page from server using CrudComponent logic
		this.setDocuments();
	}
}
