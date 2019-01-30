import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundSettingsRoutingModule } from './fund-settings-routing.module';
import { FundSettingsComponent } from './components/fund-settings/fund-settings.component';

@NgModule({
  declarations: [FundSettingsComponent],
  imports: [
    CommonModule,
    FundSettingsRoutingModule
  ]
})
export class FundSettingsModule { }
