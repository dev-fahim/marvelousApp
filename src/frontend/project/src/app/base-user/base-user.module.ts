import { BaseUserViewComponent } from './base-user-view/base-user-view.component';
import { BaseUserEditComponent } from './base-user-edit/base-user-edit.component';
import { BaseUserComponent } from './base-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseUserRoutingModule } from './base-user-routing.module';

@NgModule({
  declarations: [
    BaseUserComponent,
    BaseUserEditComponent,
    BaseUserViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseUserRoutingModule
  ]
})
export class BaseUserModule { }
