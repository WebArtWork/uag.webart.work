export const aceForm = {
	formId: 'ace',
	title: 'Ace editor',
	components: [
		// Language / theme
		{
			name: 'Select',
			key: 'mode',
			props: {
				label: 'Mode (language)',
				placeholder: 'Select language mode...',
				items: [
					'text',
					'javascript',
					'typescript',
					'json',
					'html',
					'css',
					'scss',
					'markdown',
					'sql',
					'yaml',
					'xml',
					'sh',
					'powershell',
				],
			},
		},
		{
			name: 'Select',
			key: 'theme',
			props: {
				label: 'Theme',
				placeholder: 'Select theme...',
				items: [
					'github',
					'monokai',
					'tomorrow',
					'twilight',
					'solarized_light',
					'solarized_dark',
					'dracula',
					'chaos',
					'chrome',
					'clouds',
				],
			},
		},

		// Layout
		{
			name: 'Input',
			key: 'fontSize',
			props: {
				label: 'Font size',
				placeholder: 'Example: 12px or 12pt',
			},
		},
		{
			name: 'Input',
			key: 'minLines',
			props: {
				label: 'Min lines',
				placeholder: 'e.g. 10',
				type: 'number',
			},
		},
		{
			name: 'Input',
			key: 'maxLines',
			props: {
				label: 'Max lines',
				placeholder: 'e.g. 60',
				type: 'number',
			},
		},

		// Tabs / wrapping
		{
			name: 'Input',
			key: 'tabSize',
			props: {
				label: 'Tab size',
				placeholder: 'e.g. 2 or 4',
				type: 'number',
			},
		},
		{
			name: 'Input',
			key: 'useSoftTabs',
			props: {
				label: 'Use soft tabs (spaces)',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'wrap',
			props: {
				label: 'Wrap long lines',
				type: 'checkbox',
			},
		},

		// Visibility / UX
		{
			name: 'Input',
			key: 'showLineNumbers',
			props: {
				label: 'Show line numbers',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'showGutter',
			props: {
				label: 'Show gutter',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'highlightActiveLine',
			props: {
				label: 'Highlight active line',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'showPrintMargin',
			props: {
				label: 'Show print margin',
				type: 'checkbox',
			},
		},

		// Behavior
		{
			name: 'Input',
			key: 'readOnly',
			props: {
				label: 'Read only',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'useWorker',
			props: {
				label: 'Use web worker (linting, etc.)',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'disabled',
			props: {
				label: 'Disabled (component)',
				type: 'checkbox',
			},
		},
		{
			name: 'Input',
			key: 'useAceClass',
			props: {
				label: 'Use Ace built-in styles',
				type: 'checkbox',
			},
		},

		// Extra config escape hatch
		{
			name: 'Input',
			key: 'configJson',
			props: {
				label: 'Extra Ace config (JSON)',
				placeholder: '{"printMarginColumn": 120, "scrollPastEnd": 0.5}',
				type: 'textarea',
			},
		},
	],
};
