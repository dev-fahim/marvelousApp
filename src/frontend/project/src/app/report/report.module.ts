import { ReportComponent } from './report.component';
import { ExpenditureRecordPdfComponent } from './expenditure-record-pdf/expenditure-record-pdf.component';
import { CreditFundPdfComponent } from './credit-fund-pdf/credit-fund-pdf.component';
import { CreditFundCsvComponent } from './credit-fund-csv/credit-fund-csv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenditureRecordCsvComponent } from './expenditure-record-csv/expenditure-record-csv.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [
    ReportComponent,
    CreditFundCsvComponent,
    CreditFundPdfComponent,
    ExpenditureRecordPdfComponent,
    ExpenditureRecordCsvComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
