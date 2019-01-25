import {Directive, ElementRef, AfterViewInit} from "@angular/core";
declare var jQuery: any;

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit {

  constructor(private dropdown: ElementRef) {}

  ngAfterViewInit(): void {
    jQuery(this.dropdown.nativeElement).dropdown();
  }

}
