import { FormComponentInterface } from 'src/app/libs/form/interfaces/component.interface';
import { environment } from 'src/environments/environment';

export const userFormComponents = {
	formId: 'user',
	title: 'Profile Settings',
	components: [
		{
			name: 'Input',
			key: 'name',
			focused: true,
			props: {
				placeholder: 'Enter name...',
				label: 'Name',
			},
		},
		{
			name: 'Input',
			key: 'email',
			props: {
				placeholder: 'Enter email...',
				label: 'Email',
				type: 'email',
			},
		},
		{
			name: 'Input',
			key: 'phone',
			props: {
				placeholder: 'Enter phone...',
				label: 'Phone',
			},
		},
		{
			name: 'Input',
			key: 'bio',
			props: {
				placeholder: 'Enter bio...',
				label: 'Biography',
				type: 'textarea',
			},
		},
		...((
			environment as unknown as {
				userForm?: FormComponentInterface[];
			}
		).userForm || []),
	],
};
