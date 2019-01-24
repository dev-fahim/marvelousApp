import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/login']);
  }

}
