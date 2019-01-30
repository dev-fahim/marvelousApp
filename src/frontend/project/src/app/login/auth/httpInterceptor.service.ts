// src/app/auth/token.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let logged_in = this.auth.is_logged_in()

  if (logged_in === true) {

    request = request.clone({
      setHeaders: {
        Authorization: 'JWT ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      }
    });
    } else {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
    }
    

    return next.handle(request);
  }
}