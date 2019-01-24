import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyViewComponent } from './company-view/company-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';

const routes: Routes = [
  { path: '', component: CompanyComponent },
  { path: 'view', component: CompanyViewComponent },
  { path: 'edit', component: CompanyEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
