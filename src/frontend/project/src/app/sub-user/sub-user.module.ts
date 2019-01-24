import { SubUserListComponent } from './sub-user-list/sub-user-list.component';
import { SubUserEditComponent } from './sub-user-edit/sub-user-edit.component';
import { SubUserAddComponent } from './sub-user-add/sub-user-add.component';
import { SubUserComponent } from './sub-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubUserRoutingModule } from './sub-user-routing.module';

@NgModule({
  declarations: [
    SubUserComponent,
    SubUserAddComponent,
    SubUserEditComponent,
    SubUserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubUserRoutingModule
  ]
})
export class SubUserModule { }
