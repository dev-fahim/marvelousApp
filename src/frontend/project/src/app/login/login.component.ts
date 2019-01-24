import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login_error = false;
  message = '';

  form = new FormGroup({
    username: new FormControl("", [
      Validators.required, Validators.minLength(4)
    ]),
    email: new FormControl(""),
    password: new FormControl("", [
      Validators.required, Validators.minLength(8)
    ])
  })

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this._authService.login(this.form.value)
      .subscribe(
        (response) => {
          if (response.logged_in) {
            this._authService.set_loggedin(true);
            this.login_error = false;
            return this._router.navigate([AuthService.login_success_url]);
          }
        },
        (error: Response) => {
          this.message = 'Login cridentials are incorrect.';
          this.form.reset;
          return this.login_error = true;
        }
      );
  }

  get get_error() {
    return this.login_error;
  }

}
