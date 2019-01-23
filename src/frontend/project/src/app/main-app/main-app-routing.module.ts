import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { RecordComponent } from './expenditure/record/record.component';
import { RecordListComponent } from './expenditure/record/record-list/record-list.component';
import { RecordEditComponent } from './expenditure/record/record-edit/record-edit.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuardService } from '../login/auth/auth-guard.service';
import { AuthChildGuardService } from '../login/auth/auth-child-guard.service';
import { MainAppComponent } from './main-app.component';

const routes: Routes = [
  {
    path: '', component: MainAppComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
      {
        path: 'expenditure', component: ExpenditureComponent, canActivateChild: [AuthChildGuardService], children: [
          {
            path: 'record', component: RecordComponent, children: [
              { path: 'list-add', component: RecordListComponent },
              { path: 'edit/:uuid', component: RecordEditComponent }
            ]
          }
        ],
      },
      { path: 'no-access', component: NoAccessComponent, canActivate: [AuthGuardService] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
