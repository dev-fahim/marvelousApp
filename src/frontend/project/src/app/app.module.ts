import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { FundService } from './service/credit/fund.service';
import { SourceService } from './service/credit/source.service';
import { AuthService } from './service/auth/auth.service';
import { TokenInterceptor } from './service/auth/token.interceptor.service';
import { HeadingService } from './service/expenditure/heading.service';
import { RecordListComponent } from './expenditure/record/record-list/record-list.component';
import { RecordAddComponent } from './expenditure/record/record-add/record-add.component';
import { RecordEditComponent } from './expenditure/record/record-edit/record-edit.component';
import { RecordComponent } from './expenditure/record/record.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecordFilterComponent } from './expenditure/record/record-filter/record-filter.component';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { DataService } from './data.service';
import { NoAccessComponent } from './no-access/no-access.component';
import { UserCanEditService } from './auth/user-can-edit.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    RecordListComponent,
    RecordAddComponent,
    RecordEditComponent,
    RecordComponent,
    DashboardComponent,
    ExpenditureComponent,
    RecordFilterComponent,
    NotificationMessageComponent,
    NoAccessComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, FundService, SourceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, HeadingService, DataService, UserCanEditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
