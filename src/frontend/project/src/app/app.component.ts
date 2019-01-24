import { Component } from '@angular/core';
import { AuthService } from './login/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  is_loggedin: boolean = false;

  constructor(private _authService: AuthService) { }

  onInit() {
    this._authService.is_loggedin.subscribe(
      (value) => {
        this.set_logged_in(value);
      }
    )
  }

  set_logged_in(value: boolean) {
    this.is_loggedin = value;
  }

  get logged_in() {
    return this.is_loggedin;
  }
 }
