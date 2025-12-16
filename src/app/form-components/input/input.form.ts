export const inputForm = {
	formId: 'form',
	title: 'Form',
	components: [
		{
			name: 'Input',
			key: 'label',
			focused: true,
			props: {
				placeholder: 'Enter component label...',
				label: 'Label',
			},
		},
		{
			name: 'Input',
			key: 'placeholder',
			props: {
				placeholder: 'Enter component placeholder...',
				label: 'Placeholder',
			},
		},
		{
			name: 'Select',
			key: 'type',
			props: {
				placeholder: 'Enter component type...',
				label: 'Type',
				items: [
					'text',
					'password',
					'email',
					'radio',
					'checkbox',
					'textarea',
					'search',
					'tel',
					'url',
					'number',
					'range',
					'color',
					'date',
					'month',
					'week',
					'time',
					'datetime',
					'datetime-local',
				],
			},
		},
		{
			name: 'Input',
			key: 'name',
			props: {
				placeholder: 'Enter HTML name attribute...',
				label: 'Name',
			},
		},
		{
			name: 'Input',
			key: 'autocomplete',
			props: {
				placeholder:
					'Enter autocomplete (email, name, current-password, off...)',
				label: 'Autocomplete',
			},
		},
		{
			name: 'Input',
			key: 'wClass',
			props: {
				placeholder: 'Enter extra CSS classes...',
				label: 'CSS classes',
			},
		},
		{
			name: 'Input',
			key: 'items',
			props: {
				label: 'Items (for radio / checkbox)',
				placeholder: 'Option 1, Option 2, Option 3...',
				type: 'textarea',
			},
		},
		{
			name: 'Input',
			key: 'clearable',
			props: {
				label: 'Clearable',
				type: 'checkbox',
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
			key: 'focused',
			props: {
				label: 'Auto focus',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'error',
			props: {
				label: 'Custom error (optional)',
				placeholder: 'Static error or i18n key...',
			},
		},
	],
};
