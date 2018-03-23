import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';
@Directive({
    selector: '[pvdAutoFocus]',
})
export class AutofocusDirective implements OnInit {
    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit(): void {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus');
    }
}
