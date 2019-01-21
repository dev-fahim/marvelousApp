import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { RecordComponent } from './expenditure/record/record.component';
import { RecordListComponent } from './expenditure/record/record-list/record-list.component';
import { RecordEditComponent } from './expenditure/record/record-edit/record-edit.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { UserCanEditService } from './auth/user-can-edit.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'expenditure', component: ExpenditureComponent, children: [
    { path: 'record', component: RecordComponent, children: [
      { path: 'list-add', component: RecordListComponent },
      { path: 'edit/:uuid', component: RecordEditComponent , canActivate: [UserCanEditService, ]}
    ] }
  ] },
  { path: 'no-access', component: NoAccessComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
