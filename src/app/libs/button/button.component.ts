import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	inject,
	input,
	output,
} from '@angular/core';
import { buttonDefaults } from './button.const';
import { ButtonType } from './button.type';

@Component({
	selector: 'wbutton',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class ButtonComponent {
	private _cdr = inject(ChangeDetectorRef);

	// Inputs
	readonly type = input<ButtonType>(buttonDefaults.type);
	readonly extraClass = input<string>(buttonDefaults.extraClass);
	readonly disabled = input<boolean>(buttonDefaults.disabled);
	readonly disableSubmit = input<boolean>(buttonDefaults.disableSubmit);
	/** If false (default), blocks subsequent clicks for 2s */
	readonly isMultipleClicksAllowed = input<boolean>(
		buttonDefaults.isMultipleClicksAllowed,
	);

	// Outputs — prefer (wClick). (click) on <wbutton> will still work.
	readonly wClick = output<MouseEvent>();

	private _cooling = false;

	get isBlocked(): boolean {
		return (
			this.disabled() ||
			(!this.isMultipleClicksAllowed() && this._cooling)
		);
	}

	clicked(event: MouseEvent): void {
		if (this.isBlocked) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}

		this.wClick.emit(event);

		if (!this.isMultipleClicksAllowed()) {
			this._cooling = true;
			this._cdr.markForCheck();

			setTimeout(() => {
				this._cooling = false;
				this._cdr.markForCheck();
			}, 2000);
		}
	}

	resolveType(): 'button' | 'submit' {
		return this.disableSubmit() ? 'button' : 'submit';
	}
}
