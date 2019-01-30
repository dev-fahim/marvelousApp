import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundSettingsRoutingModule } from './fund-settings-routing.module';
import { FundSettingsComponent } from './components/fund-settings/fund-settings.component';
import { FundLoginAgainComponent } from './components/fund-login-again/fund-login-again.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FundSettingsComponent, FundLoginAgainComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FundSettingsRoutingModule
  ]
})
export class FundSettingsModule { }
