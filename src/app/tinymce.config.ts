import { TinymceOptions } from 'ngx-tinymce';

export const tinymceConfig: TinymceOptions = {
	baseURL: './assets/tinymce/',
	config: {
		// basic UI
		height: 480,
		resize: true,
		statusbar: true,
		menubar: 'file edit view insert format tools table help',
		branding: false,
		promotion: false, // hide "Get all features"

		// keep menus rich
		menu: {
			file: {
				title: 'File',
				items: 'newdocument restoredraft | preview | print | export',
			},
			edit: {
				title: 'Edit',
				items: 'undo redo | cut copy paste | selectall | searchreplace',
			},
			view: {
				title: 'View',
				items: 'code visualaid visualchars visualblocks | preview fullscreen',
			},
			insert: {
				title: 'Insert',
				items: 'link image media table hr charmap emoticons codesample pagebreak nonbreaking anchor',
			},
			format: {
				title: 'Format',
				items: 'bold italic underline strikethrough superscript subscript | formats | removeformat',
			},
			tools: {
				title: 'Tools',
				items: 'spellchecker wordcount',
			},
			table: {
				title: 'Table',
				items: 'inserttable | cell row column | tableprops deletetable',
			},
			help: {
				title: 'Help',
				items: 'help',
			},
		},

		// rich toolbar (split into two rows)
		toolbar:
			'undo redo | blocks fontfamily fontsize | ' +
			'bold italic underline strikethrough | forecolor backcolor | ' +
			'alignleft aligncenter alignright alignjustify | ' +
			'outdent indent | numlist bullist | ' +
			'link image media table | ' +
			'charmap emoticons hr pagebreak | ' +
			'blockquote codesample | ' +
			'removeformat | fullscreen preview print | ltr rtl',

		toolbar_mode: 'sliding',
		contextmenu: 'link image table',

		// plugins (core + most useful extras)
		plugins:
			'advlist autolink lists link image charmap preview anchor ' +
			'searchreplace visualblocks visualchars code fullscreen ' +
			'insertdatetime media table help wordcount emoticons ' +
			'pagebreak nonbreaking directionality quickbars codesample',

		// quick toolbars when selecting text / images
		quickbars_selection_toolbar:
			'bold italic underline | forecolor backcolor | link quickimage | ' +
			'removeformat',
		quickbars_insert_toolbar: 'quickimage media table',

		// look & feel
		skin: 'oxide',
		content_css: 'default',

		// keep menus above your modal
		z_index: 999999,
	},
};
