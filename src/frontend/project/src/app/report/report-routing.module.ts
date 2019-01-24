import { ExpenditureRecordPdfComponent } from './expenditure-record-pdf/expenditure-record-pdf.component';
import { ExpenditureRecordCsvComponent } from './expenditure-record-csv/expenditure-record-csv.component';
import { CreditFundPdfComponent } from './credit-fund-pdf/credit-fund-pdf.component';
import { CreditFundCsvComponent } from './credit-fund-csv/credit-fund-csv.component';
import { ReportComponent } from './report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReportComponent },
  { path: 'credit-fund-csv', component: CreditFundCsvComponent },
  { path: 'credit-fund-pdf', component: CreditFundPdfComponent },
  { path: 'expenditure-record-csv', component: ExpenditureRecordCsvComponent },
  { path: 'expenditure-record-pdf', component: ExpenditureRecordPdfComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
