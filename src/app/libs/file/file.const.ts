export const fileDefaults = {
	label: '',
	placeholder: 'Select file',
	disabled: false,
	clearable: true,
	accept: '*/*',
	preview: true,

	// behaviour
	mode: 'single-image', // 'single-image' | 'single-file' | 'multi-image' | 'multi-file'
	view: 'dropzone', // 'dropzone' | 'list' | 'thumb-only'

	// crop
	cropWidth: null as number | null,
	cropHeight: null as number | null,

	// backend routing
	container: 'general',
	name: '',
};
