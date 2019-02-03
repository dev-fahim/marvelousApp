import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveAppRoutingModule } from './archive-app-routing.module';
import { ArchiveListComponent } from './components/archive-list/archive-list.component';

@NgModule({
  declarations: [ArchiveListComponent],
  imports: [
    CommonModule,
    ArchiveAppRoutingModule
  ]
})
export class ArchiveAppModule { }
