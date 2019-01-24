import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

const token = () => { return localStorage.getItem('access_token') }
const helper = new JwtHelperService();
let isExpired = true;
if (token) {
  isExpired = helper.isTokenExpired(token());
}

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

  static login_url = '';
  static login_success_url = '/home';
  static login_api_url = '';

  constructor(private _http: HttpClient) { }

  private loggedin = new BehaviorSubject(false);
  get_loggedin = this.loggedin

  login(data: LoginModel) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this._http.post<LoginResponseModel>(AuthService.login_api_url, JSON.stringify(data), { headers: headers }).pipe(
      map(
        (response) => {
          if (response && response.token) {
            this.set_loggedin(true);
            localStorage.setItem('access_token', response.token);
            return {
              logged_in: true,
              user_info: response.user
            }
          }
        }
      ),
      catchError(
        (error: Response) => { return Observable.throw(error); }
      )
    )
  }

  isLoggedin() {
    return !isExpired;
  }

  get is_loggedin() {
    return this.get_loggedin;
  }

  set_loggedin(value: boolean) {
    this.loggedin.next(value);
  }
}
