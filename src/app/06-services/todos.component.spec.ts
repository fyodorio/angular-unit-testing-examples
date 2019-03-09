import {TodosComponent} from './todos.component';
import {TodoService} from './todo.service';
import {of} from 'rxjs';

describe('TodosComponent', () => {
	let component: TodosComponent;
	let service: TodoService;

	beforeEach(() => {
		service = new TodoService(null);
		component = new TodosComponent(service);
	});

	it('should set todos property with the items returned from the server', () => {
		const todos = [
			{id: 1, title: 'a'},
			{id: 2, title: 'b'},
			{id: 3, title: 'c'}
		];
		spyOn(service, 'getTodos').and.callFake(() => {
			return of(todos);
		});

		component.ngOnInit();

		expect(component.todos).toBe(todos);
	});
});
