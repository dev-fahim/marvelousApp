import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  constructor(private _http: HttpClient) { }

  get_all_headings() {
    return this._http.get(LOCAL_REST_API_SERVER + 'expenditure/heading/list-add/')
  }

  add_heading(data) {
    return this._http.post(LOCAL_REST_API_SERVER + 'expenditure/heading/list-add/', JSON.stringify(data))
  }
}
