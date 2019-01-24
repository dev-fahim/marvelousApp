import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGaurdService implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const helper = new JwtHelperService();
    function tokenGetter() {
      return localStorage.getItem('access_token')
    }
    const isExpired = helper.isTokenExpired(localStorage.getItem('access_token'));
    const token = tokenGetter();
    if (token) {
      if (!isExpired) {
        this._router.navigate(['/main-app']);
        return false;
      }
      return true;
    }
    return true;
    
  }
}
