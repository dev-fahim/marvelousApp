import { AuthService } from './../login/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user = '';

  constructor(private _router: Router, private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getUserPermission() 
      .subscribe(
        (resposne) => {
          return this.user = resposne.user_permissions.user_type;
        }
      )
  }

  onLogout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }

}
