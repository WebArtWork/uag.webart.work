import {
	Directive,
	ElementRef,
	Injector,
	OnInit,
	effect,
	inject,
	input,
	runInInjectionContext,
} from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Directive({ selector: '[translate]' })
export class TranslateDirective implements OnInit {
	translate = input<string>();

	private readonly _el = inject(ElementRef<HTMLElement>);

	private readonly _translateService = inject(TranslateService);

	private readonly _inj = inject(Injector);

	ngOnInit() {
		const original = this._el.nativeElement.textContent ?? '';

		runInInjectionContext(this._inj, () => {
			effect(() => {
				const translated = this._translateService.translate(
					this.translate() || original,
				);

				this._el.nativeElement.textContent = translated();
			});
		});
	}
}
