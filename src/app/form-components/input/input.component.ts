import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	inject,
	viewChild,
} from '@angular/core';
import { FormService } from '@lib/form';
import { InputComponent, inputDefaults } from '@lib/input';

interface Interface {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [InputComponent],
	templateUrl: './input.component.html',
})
export class InputFormComponent implements OnInit {
	private readonly _formService = inject(FormService);

	readonly templateRef =
		viewChild.required<TemplateRef<Interface>>('templateRef');

	readonly inputDefaults = inputDefaults;

	ngOnInit(): void {
		this._formService.addTemplateComponent<Interface>(
			'Input',
			this.templateRef(),
		);
	}
}
