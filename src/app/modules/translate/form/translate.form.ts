export const translateForm = {
	formId: 'translate',
	title: 'Translate',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Label',
					value: 'Title',
				},
				{
					name: 'Placeholder',
					value: 'fill translate title',
				},
			],
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Label',
					value: 'Description',
				},
				{
					name: 'Placeholder',
					value: 'fill translate description',
				},
				{
					name: 'Textarea',
					value: true,
				},
			],
		},
	],
};
