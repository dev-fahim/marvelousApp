import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackAppRoutingModule } from './back-app-routing.module';
import { HistoryCreditComponent } from './components/history-credit/history-credit.component';
import { HistoryExpendComponent } from './components/history-expend/history-expend.component';

@NgModule({
  declarations: [HistoryCreditComponent, HistoryExpendComponent],
  imports: [
    CommonModule,
    FormsModule,
    BackAppRoutingModule
  ]
})
export class BackAppModule { }
