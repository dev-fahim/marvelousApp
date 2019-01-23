import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';

export interface HeadingGETModel {
  id: number ;
  heading_name: string ;
  description: string ;
  uuid: string ;
  added: string ;
  updated: string ;
}

export interface HeadingPOSTModel {
  heading_name: string ;
  description: string ;
}
@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  constructor(private _http: HttpClient) { }

  get_all_headings() {
    return this._http.get<HeadingGETModel[]>(LOCAL_REST_API_SERVER + 'expenditure/heading/list/')
  }

  add_heading(data) {
    return this._http.post<HeadingPOSTModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/list-add/', JSON.stringify(data))
  }
}
