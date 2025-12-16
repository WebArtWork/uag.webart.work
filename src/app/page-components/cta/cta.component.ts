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
type Align = 'left' | 'center' | 'right';

@Component({
	selector: 'page-cta',
	standalone: true,
	imports: [CommonModule, ButtonComponent],
	templateUrl: './cta.component.html',
	styleUrl: './cta.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent {
	// Texts
	title = input<string>('Ready to build?');
	desc = input<string>(
		'Use these blocks to launch pages in hours, not weeks.',
	);

	// Buttons
	primaryText = input<string>('Start now');
	secondaryText = input<string>('Contact sales');
	primaryType = input<ButtonType>('primary');
	secondaryType = input<ButtonType>('info');
	showSecondary = input<boolean>(true);

	// Layout
	align = input<Align>('left'); // aligns actions row

	// Outputs
	primaryClick = output<void>();
	secondaryClick = output<void>();
}
