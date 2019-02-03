import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanAppRoutingModule } from './loan-app-routing.module';
import { CreditAddComponent } from './components/credit-add/credit-add.component';
import { CreditListComponent } from './components/credit-list/credit-list.component';
import { CreditEditComponent } from './components/credit-edit/credit-edit.component';
import { DebitEditComponent } from './components/debit-edit/debit-edit.component';
import { DebitAddComponent } from './components/debit-add/debit-add.component';
import { DebitListComponent } from './components/debit-list/debit-list.component';
import { DebitFilterComponent } from './components/debit-filter/debit-filter.component';
import { CreditFilterComponent } from './components/credit-filter/credit-filter.component';
import { LoanAppComponent } from './components/loan-app/loan-app.component';

@NgModule({
  declarations: [
    CreditAddComponent, 
    CreditListComponent, 
    CreditEditComponent, 
    DebitEditComponent, 
    DebitAddComponent, 
    DebitListComponent, 
    DebitFilterComponent, 
    CreditFilterComponent, LoanAppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoanAppRoutingModule
  ]
})
export class LoanAppModule { }
