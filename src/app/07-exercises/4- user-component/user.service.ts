import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
	private _url = 'http://jsonplaceholder.typicode.com/users';

	constructor(private _httpClient: HttpClient) {}

	getUsers() {
		return this._httpClient.get(this._url) /*.map(res => res.json())*/;
	}

	getUser(userId) {
		return this._httpClient.get(this.getUserUrl(userId));
		/*.map(res => res.json())*/
	}

	addUser(user) {
		return this._httpClient.post(this._url, JSON.stringify(user));
		/*.map(res => res.json())*/
	}

	updateUser(user) {
		return this._httpClient.put(
			this.getUserUrl(user.id),
			JSON.stringify(user)
		);
		/*.map(res => res.json())*/
	}

	deleteUser(userId) {
		return this._httpClient.delete(this.getUserUrl(userId));
		/*.map(res => res.json())*/
	}

	private getUserUrl(userId) {
		return this._url + '/' + userId;
	}
}
