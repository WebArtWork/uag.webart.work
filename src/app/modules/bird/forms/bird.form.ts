export const birdForm = {
	formId: 'bird',
	title: 'Bird',
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
					value: 'Enter bird title ...',
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
					value: 'Enter bird description ...',
				},
			],
		},
	],
};
