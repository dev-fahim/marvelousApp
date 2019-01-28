import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DetailComponent } from './components/detail/detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main-app/profile/view' },
  { path: 'view', component: DetailComponent },
  { path: 'edit', component: EditComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
