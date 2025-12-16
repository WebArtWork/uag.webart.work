import {
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	input,
	output,
} from '@angular/core';
import { buttonDefaults } from './button.const';
import { ButtonType } from './button.type';

@Directive({
	selector: 'button[wbutton], a[wbutton]',
	standalone: true,
})
export class ButtonDirective {
	constructor(private el: ElementRef<HTMLElement>) {}

	readonly type = input<ButtonType>(buttonDefaults.type);
	readonly disabled = input<boolean>(buttonDefaults.disabled);
	readonly disableSubmit = input<boolean>(buttonDefaults.disableSubmit);
	/** If false (default), blocks subsequent clicks for 2s */
	readonly isMultipleClicksAllowed = input<boolean>(
		buttonDefaults.isMultipleClicksAllowed,
	);

	/** Extra classes without colliding with native `class` */
	readonly extraClass = input<string>(buttonDefaults.extraClass);

	/** Emits alongside the host’s native click */
	readonly wClick = output<void>();

	private cooling = false;

	private get tag(): string {
		return this.el.nativeElement.tagName;
	}
	private get isButton(): boolean {
		return this.tag === 'BUTTON';
	}
	private get isBlocked(): boolean {
		return (
			this.disabled() || (!this.isMultipleClicksAllowed() && this.cooling)
		);
	}

	@HostBinding('attr.type')
	get hostType(): 'button' | 'submit' | null {
		return this.isButton
			? this.disableSubmit()
				? 'button'
				: 'submit'
			: null;
	}

	@HostBinding('attr.disabled')
	get nativeDisabled(): '' | null {
		return this.isButton && this.isBlocked ? '' : null;
	}

	@HostBinding('attr.aria-disabled')
	get ariaDisabled(): 'true' | null {
		return !this.isButton && this.isBlocked ? 'true' : null;
	}

	@HostBinding('class')
	get hostClass(): string {
		return [
			'wbutton',
			`wbutton--${this.type()}`,
			this.isBlocked ? 'is-disabled' : '',
			this.extraClass() || '',
		]
			.filter(Boolean)
			.join(' ');
	}

	@HostListener('click', ['$event'])
	onClick(ev: Event) {
		if (this.isBlocked) {
			ev.preventDefault();
			(ev as any).stopImmediatePropagation?.();
			return;
		}
		this.wClick.emit();

		if (!this.isMultipleClicksAllowed()) {
			this.cooling = true;
			setTimeout(() => (this.cooling = false), 2000);
		}
	}
}
