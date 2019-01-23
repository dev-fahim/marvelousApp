import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { RecordAddComponent } from './expenditure/record/record-add/record-add.component';
import { RecordEditComponent } from './expenditure/record/record-edit/record-edit.component';
import { RecordFilterComponent } from './expenditure/record/record-filter/record-filter.component';
import { RecordListComponent } from './expenditure/record/record-list/record-list.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { RecordComponent } from './expenditure/record/record.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { MainAppComponent } from './main-app.component';

@NgModule({
  declarations: [
    MainAppComponent,
    DashboardComponent,
    ExpenditureComponent,
    RecordAddComponent,
    RecordEditComponent,
    RecordFilterComponent,
    RecordListComponent,
    NoAccessComponent,
    RecordComponent,
    SidebarComponent,
    ToolbarComponent,
    NotificationMessageComponent
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainAppModule { }
