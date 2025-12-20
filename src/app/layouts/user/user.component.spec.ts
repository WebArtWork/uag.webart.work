import { Platform } from '@angular/cdk/platform';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LanguageService } from 'src/app/modules/translate/services/language.service';
import { UserService } from 'src/app/modules/user/services/user.service';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
	let component: UserComponent;
	let fixture: ComponentFixture<UserComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [UserComponent],
			providers: [
				provideRouter([]),
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

		fixture = TestBed.createComponent(UserComponent);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggle menu state', () => {
		expect(component.isOpen()).toBe(false);

		component.toggleMenu();
		expect(component.isOpen()).toBe(true);

		component.toggleMenu();
		expect(component.isOpen()).toBe(false);
	});

	it('should close menu', () => {
		component.toggleMenu();
		expect(component.isOpen()).toBe(true);

		component.closeMenu();
		expect(component.isOpen()).toBe(false);
	});
});
