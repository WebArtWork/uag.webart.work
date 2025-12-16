export const tinymceForm = {
	formId: 'tinymce',
	title: 'Tinymce',
	components: [
		// UX basics
		{
			name: 'Input',
			key: 'placeholder',
			focused: true,
			props: {
				label: 'Placeholder',
				placeholder: 'Enter editor placeholder...',
			},
		},
		{
			name: 'Input',
			key: 'height',
			props: {
				label: 'Height (px)',
				placeholder: 'Example: 300',
				type: 'number',
			},
		},
		{
			name: 'Input',
			key: 'minHeight',
			props: {
				label: 'Min height (px)',
				placeholder: 'Example: 200',
				type: 'number',
			},
		},
		{
			name: 'Input',
			key: 'maxHeight',
			props: {
				label: 'Max height (px)',
				placeholder: 'Example: 600',
				type: 'number',
			},
		},

		// Toggles
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
			key: 'inline',
			props: {
				label: 'Inline mode',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'menubar',
			props: {
				label: 'Show menubar',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'statusbar',
			props: {
				label: 'Show statusbar',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'branding',
			props: {
				label: 'Show TinyMCE branding',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'pasteAsText',
			props: {
				label: 'Paste as plain text',
				type: 'checkbox',
			},
		},

		// Toolbar / plugins presets
		{
			name: 'Select',
			key: 'toolbarPreset',
			props: {
				label: 'Toolbar preset',
				placeholder: 'Choose toolbar preset...',
				items: ['basic', 'standard', 'full', 'custom'],
			},
		},
		{
			name: 'Select',
			key: 'pluginsPreset',
			props: {
				label: 'Plugins preset',
				placeholder: 'Choose plugins preset...',
				items: ['minimal', 'standard', 'media', 'all', 'custom'],
			},
		},

		// Content behavior
		{
			name: 'Select',
			key: 'forceRootBlock',
			props: {
				label: 'Force root block',
				placeholder: 'Default (TinyMCE)',
				items: ['default', 'p', 'div', 'false'],
			},
		},

		// Uploads / assets
		{
			name: 'Input',
			key: 'imageUploadUrl',
			props: {
				label: 'Images upload URL',
				placeholder: 'https://api.example.com/upload',
			},
		},

		// Styling
		{
			name: 'Input',
			key: 'contentCss',
			props: {
				label: 'Content CSS (URL)',
				placeholder: '/assets/tinymce-content.css',
			},
		},
		{
			name: 'Input',
			key: 'contentStyle',
			props: {
				label: 'Content styles (CSS string)',
				placeholder: 'body { font-family: system-ui; }',
				type: 'textarea',
			},
		},
		{
			name: 'Input',
			key: 'bodyClass',
			props: {
				label: 'Editor body CSS class',
				placeholder: 'w-tiny-body',
			},
		},

		// Localization / skin
		{
			name: 'Input',
			key: 'language',
			props: {
				label: 'Language code',
				placeholder: 'Example: en, uk, de...',
			},
		},
		{
			name: 'Input',
			key: 'skin',
			props: {
				label: 'Skin',
				placeholder: 'Example: oxide, oxide-dark...',
			},
		},

		// Raw config escape hatch
		{
			name: 'Input',
			key: 'configJson',
			props: {
				label: 'Extra TinyMCE config (JSON)',
				placeholder:
					'{"menubar": false, "toolbar": "undo redo | bold italic"}',
				type: 'textarea',
			},
		},
	],
};
