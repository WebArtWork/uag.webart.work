export const phraseForm = {
	formId: 'phrase',
	title: 'Phrase',
	components: [
		{
			name: 'Input',
			key: 'text',
			props: {
				label: 'Origin text',
				placeholder: 'Enter origin text...',
				type: 'textarea',
				disabled: true,
			},
		},
		{
			name: 'Input',
			key: 'translation',
			focused: true,
			props: {
				label: 'Translation',
				placeholder: 'Enter translation text...',
				type: 'textarea',
			},
		},
	],
};
