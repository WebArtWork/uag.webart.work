import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
	let component: FormComponent;
	let fixture: ComponentFixture<FormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(FormComponent);
		component = fixture.componentInstance;
		// Provide a minimal required input so the component can render
		(component as any).formConfig = () => ({
			formId: 'x',
			title: 't',
			components: [],
		});
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
