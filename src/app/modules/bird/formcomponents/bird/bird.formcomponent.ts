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
	templateUrl: './bird.formcomponent.html',
	styleUrls: ['./bird.formcomponent.scss'],
	imports: [LibSelectComponent, NgClass],
})
export class BirdFormcomponent implements OnInit {
	private _form = inject(FormService);

	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Bird', this.templateRef);
	}

	select(data: any): string {
		return data.value?.name || (data.value as unknown as string) || '';
	}
}
