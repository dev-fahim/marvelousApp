import { CreditComponent } from './credit.component';
import { FundSourceEditComponent } from './fund-source/fund-source-edit/fund-source-edit.component';
import { FundSourceListComponent } from './fund-source/fund-source-list/fund-source-list.component';
import { FundRecordEditComponent } from './fund-record/fund-record-edit/fund-record-edit.component';
import { FundRecordListComponent } from './fund-record/fund-record-list/fund-record-list.component';
import { FundRecordComponent } from './fund-record/fund-record.component';
import { FundSourceComponent } from './fund-source/fund-source.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CreditComponent },
  { path: 'fund', children: [
    { path: 'record', component: FundRecordComponent, children: [
      { path: 'list-add', component: FundRecordListComponent },
      { path: 'edit/:uuid', component: FundRecordEditComponent }
    ] },
    { path: 'source', component: FundSourceComponent, children: [
      { path: 'list-add', component: FundSourceListComponent },
      { path: 'edit', component: FundSourceEditComponent }
    ] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditRoutingModule { }
