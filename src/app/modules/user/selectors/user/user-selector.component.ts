import {
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	SimpleChanges,
	inject,
	input,
	output,
} from '@angular/core';
import { SelectComponent, SelectValue } from '@lib/select';
import { UserService } from '../../services/user.service';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [SelectComponent],
	selector: 'user-selector',
	templateUrl: './user-selector.component.html',
	styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnChanges {
	userService = inject(UserService);

	value = input('');

	onChange = output<SelectValue>();

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
