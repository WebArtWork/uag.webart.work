export const selectForm = {
	formId: 'select',
	title: 'Select',
	components: [
		{
			name: 'Input',
			key: 'label',
			focused: true,
			props: {
				placeholder: 'Enter select label...',
				label: 'Label',
			},
		},
		{
			name: 'Input',
			key: 'placeholder',
			props: {
				placeholder: 'Enter select placeholder...',
				label: 'Placeholder',
			},
		},
		{
			name: 'Input',
			key: 'bindLabel',
			props: {
				placeholder: 'Enter label field (e.g. name)...',
				label: 'Bind label',
			},
		},
		{
			name: 'Input',
			key: 'bindValue',
			props: {
				placeholder: 'Enter value field (e.g. _id)...',
				label: 'Bind value',
			},
		},
		{
			name: 'Input',
			key: 'items',
			props: {
				label: 'Items',
				placeholder: 'Option 1, Option 2, Option 3...',
				type: 'textarea',
			},
		},
		{
			name: 'Input',
			key: 'searchableBy',
			props: {
				label: 'Searchable by',
				placeholder: 'name email ...',
			},
		},
		{
			name: 'Input',
			key: 'multiple',
			props: {
				label: 'Multiple select',
				type: 'checkbox',
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
			key: 'searchable',
			props: {
				label: 'Searchable',
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
	],
};
