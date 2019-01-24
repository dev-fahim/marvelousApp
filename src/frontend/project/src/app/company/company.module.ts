import { CompanyViewComponent } from './company-view/company-view.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyComponent } from './company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyEditComponent,
    CompanyViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
