import { FundSettingsService } from './../../../service/fund-settings/fund-settings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../login/auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-login-again',
  templateUrl: './fund-login-again.component.html',
  styleUrls: ['./fund-login-again.component.scss']
})
export class FundLoginAgainComponent implements OnInit {
  @Output() all_okay = new EventEmitter<boolean>();
  message: string;
  has_error = false;

  form = new FormGroup({
    username: new FormControl("", [
      Validators.required
    ]),
    password: new FormControl("", [
      Validators.required
    ])
  });


  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _fundSettingsService: FundSettingsService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this._auth.loginUser({ username: this.form.get('username').value, password: this.form.get('password').value })
        .subscribe(
          (response: { token: string }) => {
            if (response.token != '') {
              localStorage.removeItem("access_token");
              localStorage.setItem("access_token", response.token);
              this._auth.getUserPermission()
                .subscribe(
                  (response) => {
                    if (response.is_base_user === true) {
                      this.all_okay.emit(true)
                    } else {
                      this.all_okay.emit(false);
                      this._fundSettingsService.mailOnNonBaseUser()
                        .subscribe();
                      localStorage.removeItem('access_token');
                      this._router.navigate(['/login']);
                    }
                  }
                )
            } else {
              this.all_okay.emit(false);
              localStorage.removeItem('access_token');
              this._router.navigate(['/login']);
            }
          },
          (error) => {
            this.all_okay.emit(false);
            this._fundSettingsService.mailOnWrong()
              .subscribe();
            this._router.navigate(['/login']);
            localStorage.removeItem('access_token');
          }
        )
    } else {
      this.has_error = true;
      this.message = "Fill all the fields."
    }
  }

}
