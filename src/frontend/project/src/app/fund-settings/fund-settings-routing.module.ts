import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FundSettingsComponent } from './components/fund-settings/fund-settings.component';

const routes: Routes = [
  { path: '', component: FundSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundSettingsRoutingModule { }
