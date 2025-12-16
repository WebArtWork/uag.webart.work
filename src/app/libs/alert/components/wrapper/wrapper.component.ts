import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'lib-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Container component that provides placeholder elements for alert instances
 * rendered in different screen positions.
 */
export class WrapperComponent {}
