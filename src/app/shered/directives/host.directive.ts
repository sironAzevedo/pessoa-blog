import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[pvd-host]'
})
export class PvdHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}