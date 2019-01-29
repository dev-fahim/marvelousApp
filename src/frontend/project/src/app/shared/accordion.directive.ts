import { Directive, ElementRef, AfterViewInit } from '@angular/core';
declare var jQuery: any;

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective implements AfterViewInit {

  constructor(private dropdown: ElementRef) {}

  ngAfterViewInit(): void {
    jQuery(this.dropdown.nativeElement).accordion();
  }
}
