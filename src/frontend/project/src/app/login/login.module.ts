import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRouteGaurdService } from './auth/login-route-gaurd.service';
import { AuthService } from './auth/auth.service';
import { AuthChildGuardService } from './auth/auth-child-guard.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export function tokenGetter() {
	return localStorage.getItem('access_token');
}

@NgModule({
	declarations: [],
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
		})
	],
	providers: [
		AuthService,
		AuthChildGuardService,
		AuthGuardService,
		LoginRouteGaurdService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		}
	]
})
export class LoginModule { }