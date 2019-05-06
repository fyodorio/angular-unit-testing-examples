import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
	selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
	defaultColor = 'yellow';
	@Input('appHighlight')
	bgColor: string;

	constructor(private el: ElementRef) {}

	ngOnChanges() {
		this.el.nativeElement.style.backgroundColor =
			this.bgColor || this.defaultColor;
	}
}
