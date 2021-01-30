import { TodoFormComponent } from './todo-form.component';
import { FormBuilder } from '@angular/forms';

xdescribe('TodoFormComponent', () => {
	let component: TodoFormComponent;

	beforeEach(() => {
		component = new TodoFormComponent(new FormBuilder());
	});

	it('Should create a form with 2 controls', () => {
		expect(component.form.contains('name')).toBeTruthy();
		expect(component.form.contains('email')).toBeTruthy();
	});

	it('Should make the name control required', () => {
		const control = component.form.get('name');

		control.setValue('');

		expect(control.valid).toBeFalsy();
	});
});
