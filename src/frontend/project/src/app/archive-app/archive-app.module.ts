import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveAppRoutingModule } from './archive-app-routing.module';
import { CreditArchiveComponent } from './components/credit-archive/credit-archive.component';
import { DebitArchiveComponent } from './components/debit-archive/debit-archive.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreditArchiveComponent, DebitArchiveComponent],
  imports: [
    CommonModule,
    FormsModule,
    ArchiveAppRoutingModule
  ]
})
export class ArchiveAppModule { }
