import { HistoryExpendComponent } from './components/history-expend/history-expend.component';
import { HistoryCreditComponent } from './components/history-credit/history-credit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', children: [
    { path: 'credits', component: HistoryCreditComponent },
    { path: 'debits', component: HistoryExpendComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackAppRoutingModule { }
