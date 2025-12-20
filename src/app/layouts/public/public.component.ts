import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from 'src/app/layouts/header/header.component';

@Component({
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [HeaderComponent, RouterOutlet],
})
export class PublicComponent {}
