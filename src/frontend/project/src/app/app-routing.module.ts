import { LoginRouteGaurdService } from './login/auth/login-route-gaurd.service';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthChildGuardService } from './login/auth/auth-child-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main-app' },
  { path: 'main-app', children: [
    { path: '', pathMatch: 'full', redirectTo: '/main-app/dashboard' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'expenditure', loadChildren: './expenditure/expenditure.module#ExpenditureModule' },
    { path: 'credit', loadChildren: './credit/credit.module#CreditModule' },
    { path: 'base-user', loadChildren: './base-user/base-user.module#BaseUserModule' },
    { path: 'sub-user', loadChildren: './sub-user/sub-user.module#SubUserModule' },
    { path: 'company', loadChildren: './company/company.module#CompanyModule' },
    { path: 'report', loadChildren: './report/report.module#ReportModule' },
  ], canActivateChild: [AuthChildGuardService], component: HomeComponent },
  { path: 'no-access', component: NoAccessComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginRouteGaurdService] },
  { path: '**', redirectTo: '/main-app' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
