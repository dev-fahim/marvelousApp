import { DropdownDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from './accordion.directive';
import { ModalDirective } from './modal.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    AccordionDirective,
    ModalDirective
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    AccordionDirective,
    ModalDirective
  ]
})
export class SharedModule { }
