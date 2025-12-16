export const fileForm = {
	formId: 'file',
	title: 'File',
	components: [
		{
			name: 'Input',
			key: 'label',
			focused: true,
			props: {
				label: 'Label',
				placeholder: 'Enter file field label...',
			},
		},
		{
			name: 'Input',
			key: 'placeholder',
			props: {
				label: 'Placeholder',
				placeholder: 'Select file',
			},
		},
		{
			name: 'Select',
			key: 'mode',
			props: {
				label: 'Mode',
				placeholder: 'Select mode...',
				items: [
					'single-image',
					'single-file',
					'multi-image',
					'multi-file',
				],
			},
		},
		{
			name: 'Select',
			key: 'view',
			props: {
				label: 'View',
				placeholder: 'Select view...',
				items: ['dropzone', 'list', 'thumb-only'],
			},
		},
		{
			name: 'Input',
			key: 'accept',
			props: {
				label: 'Accept',
				placeholder: 'Example: image/*, application/pdf',
			},
		},
		{
			name: 'Input',
			key: 'preview',
			props: {
				label: 'Show image preview',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'clearable',
			props: {
				label: 'Allow clear',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'cropWidth',
			props: {
				label: 'Crop width (px)',
				placeholder: 'Example: 1080',
				type: 'number',
			},
		},
		{
			name: 'Input',
			key: 'cropHeight',
			props: {
				label: 'Crop height (px)',
				placeholder: 'Example: 1080',
				type: 'number',
			},
		},
		{
			name: 'Input',
			key: 'container',
			props: {
				label: 'Backend container',
				placeholder: 'general, avatars, products...',
			},
		},
		{
			name: 'Input',
			key: 'name',
			props: {
				label: 'File name / prefix',
				placeholder: 'Optional file name prefix...',
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
