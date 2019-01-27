import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthChildGuardService implements CanActivate, CanActivateChild {

    constructor(private _authService: AuthService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const helper = new JwtHelperService();
        function tokenGetter() {
            return localStorage.getItem('access_token')
        }
        const isExpired = helper.isTokenExpired(localStorage.getItem('access_token'));
        const token = tokenGetter();
        if (token) {
            if (!isExpired) return true;
            localStorage.removeItem('access_token');
            this._router.navigate(['/login']);
            return false;
        }
        localStorage.removeItem('access_token');
        this._router.navigate(['/login']);
        return false;

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const helper = new JwtHelperService();
        function tokenGetter() {
            return localStorage.getItem('access_token')
        }
        const isExpired = helper.isTokenExpired(localStorage.getItem('access_token'));
        const token = tokenGetter();
        if (token) {
            if (!isExpired) return true;
            localStorage.removeItem('access_token');
            this._router.navigate(['/login']);
            return false;
        }
        localStorage.removeItem('access_token');
        this._router.navigate(['/login']);
        return false;

    }
}