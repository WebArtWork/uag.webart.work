import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { ButtonComponent } from 'src/app/libs/button/button.component';
import { FormComponent as WFormComponent } from 'src/app/libs/form/components/form/form.component';
import { FormInterface } from 'src/app/libs/form/interfaces/form.interface';

type Align = 'left' | 'center' | 'right';

@Component({
	selector: 'page-form',
	standalone: true,
	imports: [CommonModule, WFormComponent, ButtonComponent],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
	/** External form config (required) */
	formConfig = input.required<FormInterface>();

	/** Buttons */
	submitLabel = input<string>('Submit');
	cancelLabel = input<string>('Cancel');
	showCancel = input<boolean>(true);

	/** Actions alignment */
	actionsAlign = input<Align>('right');

	/** Events */
	submitClick = output<void>();
	cancelClick = output<void>();
}
