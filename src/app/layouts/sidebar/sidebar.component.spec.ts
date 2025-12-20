import { Platform } from '@angular/cdk/platform';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
	let component: SidebarComponent;
	let fixture: ComponentFixture<SidebarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SidebarComponent],
			providers: [
				{ provide: Platform, useValue: { ANDROID: false, IOS: false } },
				{
					provide: UserService,
					useValue: {
						thumb: () => '',
						role: () => false,
						logout: () => void 0,
						toggleTheme: () => void 0,
						theme: () => 'dark',
					},
				},
				{
					provide: LanguageService,
					useValue: {
						language: () => ({ name: '' }),
						nextLanguage: () => void 0,
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SidebarComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should apply _open class when open=true', () => {
		fixture.componentRef.setInput('open', true);
		fixture.detectChanges();

		const aside = fixture.nativeElement.querySelector(
			'aside.sidebar',
		) as HTMLElement | null;

		expect(aside).toBeTruthy();
		expect(aside!.classList.contains('_open')).toBe(true);
	});

	it('should emit close when close button clicked', () => {
		let called = false;

		component.close.subscribe(() => {
			called = true;
		});

		fixture.detectChanges();

		const btn = fixture.nativeElement.querySelector(
			'button[aria-label="Close sidebar"]',
		) as HTMLButtonElement | null;

		expect(btn).toBeTruthy();

		btn!.click();
		expect(called).toBe(true);
	});
});
