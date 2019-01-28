import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../login/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class HomeGaurd implements CanActivate {

	constructor(private _authService: AuthService, private _router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this._authService.is_logged_in()) {
			this._router.navigate(['/dashboard']);
			return false;
		}
		return true;
	}
}
