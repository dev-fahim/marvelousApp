import { Directive, ElementRef, AfterViewInit } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective implements AfterViewInit {

  constructor(private accordion: ElementRef) {}

  ngAfterViewInit(): void {
    jQuery(this.accordion.nativeElement).accordion();
  }
}
