import { ShadowDirective } from './dropdown.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ShadowDirective
  ],
  exports: [
    CommonModule,
    ShadowDirective
  ]
})
export class SharedModule { }
