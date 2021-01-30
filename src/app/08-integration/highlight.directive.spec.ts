import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
	template: `
		<p appHighlight="cyan">First</p>
		<p appHighlight>Second</p>
	`
})
class DirectiveHostComponent {}

describe('HighlightDirective', () => {
	let fixture: ComponentFixture<DirectiveHostComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [DirectiveHostComponent, HighlightDirective]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DirectiveHostComponent);
		fixture.detectChanges();
	});

	it('should highlight the first element with cyan', () => {
		const de = fixture.debugElement.queryAll(By.css('p'))[0];

		expect(de.nativeElement.style.backgroundColor).toBe('cyan');
	});

	it('should highlight the second element with the default color', () => {
		const de = fixture.debugElement.queryAll(By.css('p'))[1];
		const directive = de.injector.get(HighlightDirective);

		expect(de.nativeElement.style.backgroundColor).toBe(
			directive.defaultColor
		);
	});
});
