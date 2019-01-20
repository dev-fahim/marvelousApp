import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';


@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private _http: HttpClient) { }

  get_all_sources(search: string = '') {
    return this._http.get(LOCAL_REST_API_SERVER + 'credit/source/list-add/', { params: { search: search } })
  }

  add_sources(data: any) {
    return this._http.post(LOCAL_REST_API_SERVER + 'credit/source/list-add/', JSON.stringify(data))
  }
}