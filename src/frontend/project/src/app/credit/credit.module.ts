import { FundSourceEditComponent } from './fund-source/fund-source-edit/fund-source-edit.component';
import { FundSourceAddComponent } from './fund-source/fund-source-add/fund-source-add.component';
import { FundSourceFilterComponent } from './fund-source/fund-source-filter/fund-source-filter.component';
import { FundSourceListComponent } from './fund-source/fund-source-list/fund-source-list.component';
import { FundSourceComponent } from './fund-source/fund-source.component';
import { FundRecordListComponent } from './fund-record/fund-record-list/fund-record-list.component';
import { FundRecordFilterComponent } from './fund-record/fund-record-filter/fund-record-filter.component';
import { FundRecordEditComponent } from './fund-record/fund-record-edit/fund-record-edit.component';
import { FundRecordAddComponent } from './fund-record/fund-record-add/fund-record-add.component';
import { FundRecordComponent } from './fund-record/fund-record.component';
import { CreditComponent } from './credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditRoutingModule } from './credit-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CreditComponent,
    FundRecordComponent,
    FundRecordAddComponent,
    FundRecordEditComponent,
    FundRecordFilterComponent,
    FundRecordListComponent,
    FundSourceComponent,
    FundSourceListComponent,
    FundSourceFilterComponent,
    FundSourceAddComponent,
    FundSourceEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreditRoutingModule,
    SharedModule
  ]
})
export class CreditModule { }
