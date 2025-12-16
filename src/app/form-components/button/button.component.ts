import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { ButtonComponent, buttonDefaults } from '@lib/button';
import { FormService } from '@lib/form';

interface ButtonTemplateContext {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent],
	templateUrl: './button.component.html',
})
export class ButtonFormComponent implements OnInit {
	private readonly _formService = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<ButtonTemplateContext>>('templateRef');

	readonly buttonDefaults = buttonDefaults;

	ngOnInit(): void {
		this._formService.addTemplateComponent<ButtonTemplateContext>(
			'Button',
			this.templateRef(),
		);
	}
}
