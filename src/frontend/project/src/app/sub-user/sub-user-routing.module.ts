import { SubUserAddComponent } from './sub-user-add/sub-user-add.component';
import { SubUserEditComponent } from './sub-user-edit/sub-user-edit.component';
import { SubUserComponent } from './sub-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SubUserComponent },
  { path: 'list-add', component: SubUserAddComponent },
  { path: 'edit/<uuid:uuid>/', component: SubUserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubUserRoutingModule { }
