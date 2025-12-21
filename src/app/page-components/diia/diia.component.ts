import {
	ChangeDetectionStrategy,
	Component,
	inject,
	input,
} from '@angular/core';
import { ButtonComponent } from '@lib/button';
import { TranslateDirective } from '@module/translate';
import { UserService } from '@module/user';
import { DiiaService } from './diia.service';
@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ButtonComponent, TranslateDirective],
	selector: 'page-diia',
	templateUrl: './diia.component.html',
	styleUrls: ['./diia.component.scss'],
})
export class DiiaComponent {
	diiaService = inject(DiiaService);

	userService = inject(UserService);

	region = input.required<string>();
}
