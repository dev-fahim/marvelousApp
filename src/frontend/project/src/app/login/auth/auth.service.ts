import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import * as common from '../../common';
import { RootObject } from 'src/app/service/models';

const helper = new JwtHelperService();

interface LoginModel {
  username: string;
  email: string;
  password: string;
}

interface LoginResponseModel {
  token: string;
  user: {
    email: string,
    first_name: string,
    last_name: string,
    pk: number,
    username: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  loginUser(credentials: { username: string, password: string }) {
    return this._http.post('http://localhost:8000/rest-auth/login/', credentials).pipe(
      map(
        (response) => {
          return response
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  getUserPermission() {
    return this._http.get<RootObject>('http://localhost:8000/api/service/what-do-you-want/').pipe(
      map(
        (response: RootObject) => { return response }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    );
  }

  change_fund_status(status: boolean) {
    return this._http.put("http://localhost:8000/api/credit/fund/settings/edit/", JSON.stringify({is_not_locked: status})).pipe(
      map(
        (response: {is_not_locked: boolean}) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  is_logged_in() {
    const helper = new JwtHelperService();
    const rawToken = localStorage.getItem('access_token');

    if (rawToken != undefined || rawToken != '') {
      const isExpired = helper.isTokenExpired(rawToken);
      return !isExpired;
    }
    return false;
  }

}
