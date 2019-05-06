import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject } from 'rxjs';

class RouterStub {
	navigate(params) {}
}

class ActivatedRouteStub {
	private subject = new Subject();

	// params: Observable<any> = EMPTY;
	get params() {
		return this.subject.asObservable();
	}

	push(value) {
		this.subject.next(value);
	}
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

	it('should navigate the user to the not found page when an invalid user ID is passed', () => {
		const router = TestBed.get(Router);
		const spy = spyOn(router, 'navigate');
		const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);

		route.push({ id: 0 });

		expect(spy).toHaveBeenCalledWith(['not-found']);
	});
});
