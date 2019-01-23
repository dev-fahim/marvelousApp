import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginRouteGaurdService } from './auth/login-route-gaurd.service';
import { AuthService } from './auth/auth.service';
import { AuthChildGuardService } from './auth/auth-child-guard.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export function tokenGetter() {
	return localStorage.getItem('access_token');
}
const LOGIN_ROUTES: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoginRouteGaurdService] },
];

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['localhost:8000', 'marvelous_app_django'],
				authScheme: 'JWT ',
				throwNoTokenError: false,
				skipWhenExpired: true
			}
		}),
		RouterModule.forChild(LOGIN_ROUTES)
	],
	providers: [
		AuthService,
		AuthChildGuardService,
		AuthGuardService,
		LoginRouteGaurdService, ,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		}
	]
})
export class LoginModule { }