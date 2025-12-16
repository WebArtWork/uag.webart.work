export const buttonForm = {
	formId: 'button',
	title: 'Button',
	components: [
		{
			name: 'Input',
			key: 'label',
			focused: true,
			props: {
				label: 'Label',
				placeholder: 'Enter button label...',
			},
		},
		{
			name: 'Input',
			key: 'text',
			props: {
				label: 'Text (fallback)',
				placeholder: 'Optional alternative text...',
			},
		},
		{
			name: 'Select',
			key: 'type',
			props: {
				label: 'Button type',
				placeholder: 'Select button type...',
				items: [
					'primary',
					'secondary',
					'success',
					'danger',
					'warning',
					'info',
					'light',
					'dark',
					'link',
				],
			},
		},
		{
			name: 'Input',
			key: 'extraClass',
			props: {
				label: 'Extra CSS classes',
				placeholder: 'wbutton--wide, my-custom-class...',
			},
		},
		{
			name: 'Input',
			key: 'disabled',
			props: {
				label: 'Disabled',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'disableSubmit',
			props: {
				label: 'Disable submit (use type="button")',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'isMultipleClicksAllowed',
			props: {
				label: 'Allow multiple rapid clicks',
				type: 'checkbox',
			},
		},
	],
};
