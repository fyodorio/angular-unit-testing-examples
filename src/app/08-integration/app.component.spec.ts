import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([])],
			declarations: [AppComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should have a router outlet', () => {
		const de = fixture.debugElement.query(By.directive(RouterOutlet));

		expect(de).not.toBeNull();
	});

	it('should have a link to todos page', () => {
		const dElements = fixture.debugElement.queryAll(
			By.directive(RouterLinkWithHref)
		);

		const index = dElements.findIndex(
			de => de.properties['href'] === `/todos`
		);

		expect(index).toBeGreaterThan(-1);
	});
});
