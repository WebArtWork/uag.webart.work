import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit menuToggle when variant=user and menu button clicked', () => {
		let called = false;

		component.menuToggle.subscribe(() => {
			called = true;
		});

		fixture.componentRef.setInput('variant', 'user');
		fixture.detectChanges();

		const btn = fixture.nativeElement.querySelector(
			'button[aria-label="Menu"]',
		) as HTMLButtonElement | null;

		expect(btn).toBeTruthy();

		btn!.click();
		expect(called).toBe(true);
	});
});
