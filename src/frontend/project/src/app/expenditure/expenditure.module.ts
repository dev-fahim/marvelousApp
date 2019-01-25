import { ExpenditureComponent } from './expenditure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadingFilterComponent } from './heading/heading-filter/heading-filter.component';
import { RecordFilterComponent } from './record/record-filter/record-filter.component';
import { RecordEditComponent } from './record/record-edit/record-edit.component';
import { RecordAddComponent } from './record/record-add/record-add.component';
import { RecordListComponent } from './record/record-list/record-list.component';
import { RecordComponent } from './record/record.component';
import { HeadingEditComponent } from './heading/heading-edit/heading-edit.component';
import { HeadingListComponent } from './heading/heading-list/heading-list.component';
import { HeadingAddComponent } from './heading/heading-add/heading-add.component';
import { HeadingComponent } from './heading/heading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenditureRoutingModule } from './expenditure-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExpenditureComponent,
    HeadingComponent,
    HeadingAddComponent,
    HeadingListComponent,
    HeadingEditComponent,
    HeadingFilterComponent,
    RecordComponent,
    RecordListComponent,
    RecordAddComponent,
    RecordEditComponent,
    RecordFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExpenditureRoutingModule,
    SharedModule
  ]
})
export class ExpenditureModule { }
