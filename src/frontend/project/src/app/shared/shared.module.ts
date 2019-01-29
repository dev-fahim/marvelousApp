import { DropdownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from './accordion.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    AccordionDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    AccordionDirective
  ]
})
export class SharedModule { }
