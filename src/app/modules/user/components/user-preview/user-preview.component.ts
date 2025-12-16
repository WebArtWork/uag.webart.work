import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'user-preview',
	imports: [RouterLink],
	templateUrl: './user-preview.component.html',
	styleUrl: './user-preview.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPreviewComponent {
	userService = inject(UserService);
}
