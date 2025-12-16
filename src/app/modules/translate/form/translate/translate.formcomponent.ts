import { NgClass } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	TemplateRef,
	ViewChild,
	inject,
} from '@angular/core';
import { FormService } from 'src/app/libs/form/services/form.service';
import { SelectComponent as LibSelectComponent } from 'src/app/libs/select/select.component';

interface Interface {}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './translate.formcomponent.html',
	styleUrl: './translate.formcomponent.scss',
	imports: [LibSelectComponent, NgClass],
})
export class TranslateFormcomponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>(
			'Translate',
			this.templateRef,
		);
	}

	select(data: any): string {
		return data.value?.name || (data.value as unknown as string) || '';
	}
}
