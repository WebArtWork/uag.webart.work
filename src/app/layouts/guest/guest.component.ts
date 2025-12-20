import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	templateUrl: './guest.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet],
})
export class GuestComponent {}
