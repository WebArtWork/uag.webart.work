import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
} from '@angular/core';
import { HttpService } from 'wacom';
import { FormComponent } from '../../components/form/form.component';
import { FormInterface } from '../../interfaces/form.interface';

@Component({
	templateUrl: './modal-unique.component.html',
	styleUrls: ['./modal-unique.component.scss'],
	imports: [FormComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalUniqueComponent {
	private _http = inject(HttpService);

	// Provided by ModalService at open-time
	readonly form = input.required<FormInterface>();
	readonly module = input.required<string>();
	readonly field = input.required<string>();
	readonly doc = input.required<Record<string, unknown>>();

	get getDoc(): Record<string, unknown> {
		return this.doc();
	}

	// values are emitted by wform now (Signal Form model), but we still rely on doc() for now
	change(_values?: Record<string, unknown>): void {
		this._http
			.post(
				`/api/${this.module()}/unique${this.field() || ''}`,
				this.doc(),
			)
			.subscribe((resp: string) => {
				if (this.doc()[this.field()] !== resp) {
					this.doc()[this.field()] = resp;
				}
			});
	}
}
