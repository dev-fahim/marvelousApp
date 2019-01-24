import { RecordEditComponent } from './record/record-edit/record-edit.component';
import { RecordListComponent } from './record/record-list/record-list.component';
import { RecordComponent } from './record/record.component';
import { HeadingEditComponent } from './heading/heading-edit/heading-edit.component';
import { HeadingListComponent } from './heading/heading-list/heading-list.component';
import { ExpenditureComponent } from './expenditure.component';
import { HeadingComponent } from './heading/heading.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ExpenditureComponent },
  { path: 'heading', component: HeadingComponent, children: [
    { path: 'list-add', component: HeadingListComponent },
    { path: 'edit/:uuid', component: HeadingEditComponent }
  ] },
  { path: 'record', component: RecordComponent, children: [
    { path: 'list-add', component: RecordListComponent },
    { path: 'edit/:uuid', component: RecordEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenditureRoutingModule { }
