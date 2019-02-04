import { CreditArchiveComponent } from './components/credit-archive/credit-archive.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitArchiveComponent } from './components/debit-archive/debit-archive.component';

const routes: Routes = [
  { path: '', children: [
    { path: 'credits', component: CreditArchiveComponent },
    { path: 'debits', component: DebitArchiveComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveAppRoutingModule { }
