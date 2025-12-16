import { Component, input } from '@angular/core';

@Component({
	selector: 'icon-spider',
	templateUrl: './spider.component.html',
	styleUrl: './spider.component.scss',
	host: {
		class: 'spider',
		'[style.--spider-w]': 'width',
		'[style.--spider-h]': 'height',
		'[style.--spider-start]': 'start',
		'[style.--spider-end]': 'end',
	},
})
export class SpiderComponent {
	width = input('');
	height = input('');
	start = input('');
	end = input('');
}
