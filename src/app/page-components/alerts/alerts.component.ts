import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export type AlertType = 'info' | 'success' | 'warn' | 'error';

export interface AlertItem {
	text: string;
	type: AlertType;
	closable?: boolean;
}

@Component({
	selector: 'page-alerts',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './alerts.component.html',
	styleUrl: './alerts.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsComponent {
	/** Layout: stacked (default) or inline row */
	layout = input<'stack' | 'inline'>('stack');

	/** ARIA role for messages */
	role = input<'status' | 'alert'>('status');

	/** Make all alerts closable (per-alert can still override via `closable`) */
	dismissible = input<boolean>(false);

	/** Alerts to render */
	items = input<AlertItem[]>([
		{ text: 'Heads up: new components shipped.', type: 'info' },
		{ text: 'Your changes were saved.', type: 'success' },
		{ text: 'Usage near limit.', type: 'warn' },
		{ text: 'Something went wrong.', type: 'error' },
	]);

	/** Fired when an alert close button is pressed */
	closed = output<number>();

	/** Fired when an alert item is clicked (not the close button) */
	itemClick = output<{ index: number; item: AlertItem }>();

	onClose(index: number, ev: MouseEvent) {
		ev.stopPropagation();
		this.closed.emit(index);
	}
}
