import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_REST_API_SERVER } from '../server.url';

@Injectable({
  providedIn: 'root'
})
export class FundSettingsService {

  constructor(private _http: HttpClient) { }

  mailOnWrong() {
    return this._http.get(LOCAL_REST_API_SERVER + 'service/oh-no/');
  }

  mailOnNonBaseUser() {
    return this._http.get(LOCAL_REST_API_SERVER + 'service/oh-no-base-user/');
  }

}
