import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';

export interface TableColumn {
	key: string;
	label: string;
	align?: 'left' | 'center' | 'right';
}

export type TableRow = Record<string, any>;

type Size = 'sm' | 'md';

@Component({
	selector: 'page-table',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	/** Columns definition */
	columns = input<TableColumn[]>([
		{ key: 'plan', label: 'Plan' },
		{ key: 'users', label: 'Users' },
		{ key: 'storage', label: 'Storage' },
		{ key: 'price', label: 'Price', align: 'left' },
	]);

	/** Data rows */
	rows = input<TableRow[]>([
		{ plan: 'Starter', users: 3, storage: '5 GB', price: '$0' },
		{ plan: 'Pro', users: 10, storage: '100 GB', price: '$19' },
		{ plan: 'Team', users: 'Unlimited', storage: '1 TB', price: '$49' },
	]);

	/** Visual options */
	size = input<Size>('md'); // cell padding scale
	zebra = input<boolean>(false); // striped rows
	stickyHeader = input<boolean>(false);
	maxHeight = input<string>(''); // e.g. '360px' enables vertical scroll area

	/** Events */
	rowClick = output<{ index: number; row: TableRow }>();
	cellClick = output<{ rowIndex: number; col: TableColumn; value: any }>();
}
