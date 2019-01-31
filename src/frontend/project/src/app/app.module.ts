import { JwtInterceptor } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FundService } from './service/credit/fund.service';
import { SourceService } from './service/credit/source.service';
import { HeadingService } from './service/expenditure/heading.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RecordService } from './service/expenditure/record.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from './shared/shared.module';
import { FundSettingsService } from './service/fund-settings/fund-settings.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/login/auth/httpInterceptor.service';
import { NotificationMessageComponent } from './notification-message/notification-message.component';
import { NotificationMessageService } from './notification-message.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoAccessComponent,
    SidebarComponent,
    ToolbarComponent,
    LoginComponent,
    NotificationMessageComponent
  ],
  imports: [
    LoginModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    FundService, 
    SourceService, 
    HeadingService,
    RecordService,
    FundSettingsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NotificationMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
