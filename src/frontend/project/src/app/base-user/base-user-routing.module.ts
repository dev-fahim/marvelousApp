import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseUserComponent } from './base-user.component';
import { BaseUserViewComponent } from './base-user-view/base-user-view.component';
import { BaseUserEditComponent } from './base-user-edit/base-user-edit.component';

const routes: Routes = [
  { path: '', component: BaseUserComponent },
  { path: 'view', component: BaseUserViewComponent },
  { path: 'edit', component: BaseUserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseUserRoutingModule { }
