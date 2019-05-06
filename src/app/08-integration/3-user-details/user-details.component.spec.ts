import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

class RouterStub {
	navigate(params) {}
}

class ActivatedRouteStub {
	params: Observable<any> = EMPTY;
}

describe('UserDetailsComponent', () => {
	let component: UserDetailsComponent;
	let fixture: ComponentFixture<UserDetailsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserDetailsComponent],
			providers: [
				{
					provide: Router,
					useClass: RouterStub
				},
				{
					provide: ActivatedRoute,
					useClass: ActivatedRouteStub
				}
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should redirect the user to the users page after saving', () => {
		const router = TestBed.get(Router);
		const spy = spyOn(router, 'navigate');

		component.save();

		expect(spy).toHaveBeenCalledWith(['users']);
	});
});
