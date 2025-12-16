import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialComponent } from '@icon/material';

@Component({
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
	imports: [MaterialComponent, RouterOutlet],
})
export class PublicComponent {}
