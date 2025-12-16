import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ButtonComponent } from 'src/app/libs/button/button.component';

type ButtonType =
	| 'primary'
	| 'info'
	| 'success'
	| 'warn'
	| 'danger'
	| 'secondary';

export interface ProductPrice {
	current: string | number;
	old?: string | number;
	note?: string;
}

export interface ProductItem {
	title: string;
	description?: string;
	imageUrl?: string;
	imageAlt?: string;
	price: ProductPrice;
	primaryText?: string; // Add to cart
	secondaryText?: string; // Details
}

@Component({
	selector: 'page-products',
	standalone: true,
	imports: [CommonModule, ButtonComponent],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
	/** Product cards to render */
	items = input<ProductItem[]>([
		{
			title: 'Product name',
			description: 'Short product description goes here…',
			imageUrl: 'assets/logo.png',
			imageAlt: 'Product',
			price: { current: '$19.99', old: '$29.99', note: 'incl. VAT' },
			primaryText: 'Add to cart',
			secondaryText: 'Details',
		},
		{
			title: 'Product name',
			description: 'Short product description goes here…',
			imageUrl: 'assets/logo.png',
			imageAlt: 'Product',
			price: { current: '$19.99', old: '$29.99', note: 'incl. VAT' },
			primaryText: 'Add to cart',
			secondaryText: 'Details',
		},
		{
			title: 'Product name',
			description: 'Short product description goes here…',
			imageUrl: 'assets/logo.png',
			imageAlt: 'Product',
			price: { current: '$19.99', old: '$29.99', note: 'incl. VAT' },
			primaryText: 'Add to cart',
			secondaryText: 'Details',
		},
		{
			title: 'Product name',
			description: 'Short product description goes here…',
			imageUrl: 'assets/logo.png',
			imageAlt: 'Product',
			price: { current: '$19.99', old: '$29.99', note: 'incl. VAT' },
			primaryText: 'Add to cart',
			secondaryText: 'Details',
		},
		{
			title: 'Product name',
			description: 'Short product description goes here…',
			imageUrl: 'assets/logo.png',
			imageAlt: 'Product',
			price: { current: '$19.99', old: '$29.99', note: 'incl. VAT' },
			primaryText: 'Add to cart',
			secondaryText: 'Details',
		},
	]);

	/** Grid min column width (px) */
	minWidth = input<number>(260);

	/** Button types */
	primaryType = input<ButtonType>('primary');
	secondaryType = input<ButtonType>('info');
	showSecondary = input<boolean>(true);

	/** Emits when actions are clicked */
	primaryClick = output<{ index: number; item: ProductItem }>();
	secondaryClick = output<{ index: number; item: ProductItem }>();
	imageClick = output<{ index: number; item: ProductItem }>();
}
