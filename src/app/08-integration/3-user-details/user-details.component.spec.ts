import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

class RouterStub {
	navigate(params) {}
}

class ActivatedRouteStub implements Partial<ActivatedRoute> {
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

	beforeEach(
		waitForAsync(() => {
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
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should redirect the user to the users page after saving', () => {
		const router = TestBed.inject(Router);
		const spy = spyOn(router, 'navigate');

		component.save();

		expect(spy).toHaveBeenCalledWith(['users']);
	});

	it('should navigate the user to the not found page when an invalid user ID is passed', () => {
		const router = TestBed.inject(Router);
		const spy = spyOn(router, 'navigate');
		const route: ActivatedRouteStub = (<unknown>(
			TestBed.inject(ActivatedRoute)
		)) as ActivatedRouteStub;

		route.push({ id: 0 });

		expect(spy).toHaveBeenCalledWith(['not-found']);
	});
});
