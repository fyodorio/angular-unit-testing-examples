import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('TodosComponent', () => {
	let component: TodosComponent;
	let fixture: ComponentFixture<TodosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			declarations: [TodosComponent],
			providers: [TodoService]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TodosComponent);
		component = fixture.componentInstance;
		// fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load todos from the server', () => {
		const service = TestBed.get(TodoService);
		// fixture.debugElement.injector.get(TodoService); // - for cases when dependencies aren't provided
		spyOn(service, 'getTodos').and.returnValue(of([1, 2, 3]));

		fixture.detectChanges();

		expect(component.todos.length).toBe(3);
	});
});
