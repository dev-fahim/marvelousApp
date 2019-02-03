import { LoanAppComponent } from './components/loan-app/loan-app.component';
import { DebitEditComponent } from './components/debit-edit/debit-edit.component';
import { DebitListComponent } from './components/debit-list/debit-list.component';
import { CreditEditComponent } from './components/credit-edit/credit-edit.component';
import { CreditListComponent } from './components/credit-list/credit-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: LoanAppComponent, children: [
      {
        path: 'credit', children: [
          { path: 'list-add', component: CreditListComponent },
          { path: 'edit/:uuid', component: CreditEditComponent },
        ]
      },
      {
        path: 'debit', children: [
          { path: 'list-add', component: DebitListComponent },
          { path: 'edit/:uuid', component: DebitEditComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanAppRoutingModule { }
