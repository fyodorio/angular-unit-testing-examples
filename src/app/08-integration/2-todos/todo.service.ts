import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoService {
	constructor(private http: HttpClient) {}

	add(todo) {
		return this.http.post('...', todo) /*.map(r => r.json())*/;
	}

	getTodos() {
		return this.http.get('...') /*.map(r => r.json())*/;
	}

	getTodosPromise() {
		return (
			this.http
				.get('...')
				/*.map(r => r.json())*/
				.toPromise()
		);
	}

	delete(id) {
		return this.http.delete('...') /*.map(r => r.json())*/;
	}
}
