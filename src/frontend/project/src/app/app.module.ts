import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FundService } from './service/credit/fund.service';
import { SourceService } from './service/credit/source.service';
import { HeadingService } from './service/expenditure/heading.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './login/auth/auth.service';
import { HomeComponent } from './home/home.component';
import { RecordService } from './service/expenditure/record.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

AuthService.login_url = 'login';
AuthService.login_api_url = 'http://localhost:8000/rest-auth/login/';
AuthService.login_success_url = '/main-app/dashboard';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoAccessComponent,
    SidebarComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    LoginModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    FundService, 
    SourceService, 
    HeadingService,
    RecordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
