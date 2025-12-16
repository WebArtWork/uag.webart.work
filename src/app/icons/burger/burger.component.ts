import {
	ChangeDetectionStrategy,
	Component,
	output,
	signal,
} from '@angular/core';

@Component({
	selector: 'icon-burger',
	imports: [],
	templateUrl: './burger.component.html',
	styleUrl: './burger.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BurgerComponent {
	isOpen = signal(false);

	updated = output<boolean>();

	toggle() {
		this.isOpen.set(!this.isOpen());

		this.updated.emit(this.isOpen());
	}
}
