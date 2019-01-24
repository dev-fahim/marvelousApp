import { RecordEditComponent } from './record/record-edit/record-edit.component';
import { RecordListComponent } from './record/record-list/record-list.component';
import { HeadingEditComponent } from './heading/heading-edit/heading-edit.component';
import { HeadingListComponent } from './heading/heading-list/heading-list.component';
import { ExpenditureComponent } from './expenditure.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ExpenditureComponent },
  { path: 'heading', children: [
    { path: '', component: HeadingListComponent },
    { path: 'edit/:uuid', component: HeadingEditComponent }
  ] },
  { path: 'record', children: [
    { path: '', component: RecordListComponent },
    { path: 'edit/:uuid', component: RecordEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenditureRoutingModule { }
