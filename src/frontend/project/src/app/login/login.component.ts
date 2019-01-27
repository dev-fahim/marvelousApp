import { AppError } from './../common/errors';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserStoreService } from 'src/store/user.store.service';
import { RootObject } from '../service/models';
import * as common from '../common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = 'Login Error';
  has_error = false;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  constructor(
    private _auth: AuthService,
    private user: UserStoreService,
    private _router: Router
  ) { }

  ngOnInit() { }

  onSubmit() {
    if (this.form.valid) {
      const credentials = this.form.value;
      this._auth.loginUser(credentials)
        .subscribe(
          (response: { token: string }) => {
            localStorage.setItem('access_token', response.token);
            this._router.navigate(['/main-app/dashboard']);
          },
          (error: AppError) => {
            this.has_error = true;
            return common.throw_http_response_error(error)
          }
        )
    }
  }

  get_message() {
    return this.message;
  }

}
