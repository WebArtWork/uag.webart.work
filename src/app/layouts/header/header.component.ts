import {
	ChangeDetectionStrategy,
	Component,
	input,
	output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialComponent } from '@icon/material';

type HeaderVariant = 'public' | 'user';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MaterialComponent, RouterLink],
})
export class HeaderComponent {
	showSidebar = input<boolean>(false);

	/** User layout only */
	menuToggle = output<void>();
}
