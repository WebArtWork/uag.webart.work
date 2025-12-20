import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PublicComponent } from './public.component';

describe('PublicComponent', () => {
	let component: PublicComponent;
	let fixture: ComponentFixture<PublicComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PublicComponent],
			providers: [provideRouter([])],
		}).compileComponents();

		fixture = TestBed.createComponent(PublicComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
