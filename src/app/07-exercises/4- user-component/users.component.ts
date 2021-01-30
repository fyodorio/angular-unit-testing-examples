import {Component, OnInit, NgModule} from '@angular/core';

import { UserService } from './user.service';

@Component({
	template: ``
})
export class UsersComponent implements OnInit {
	users: any /*[]*/;

	constructor(private _service: UserService) {}

	ngOnInit() {
		this._service.getUsers().subscribe(users => (this.users = users));
	}

	deleteUser(user) {
		if (confirm('Are you sure you want to delete ' + user.name + '?')) {
			const index = this.users.indexOf(user);
			this.users.splice(index, 1);

			this._service.deleteUser(user.id).subscribe(null, err => {
				alert('Could not delete the user.');
				this.users.splice(index, 0, user);
			});
		}
	}
}

@NgModule({
	declarations: [UsersComponent],
	providers: [UserService]
})
export class UsersModule {}
