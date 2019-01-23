import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { errorResponse } from 'src/app/common/error-response';


@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private _http: HttpClient) { }

  get_all_sources(search: string = '') {
    return this._http.get(LOCAL_REST_API_SERVER + 'credit/source/list/', { params: { search: search } }).pipe(
      catchError(errorResponse)
    )
  }

  add_sources(data: any) {
    return this._http.post(LOCAL_REST_API_SERVER + 'credit/source/list-add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  update_source(data: any, uuid: string) {
    return this._http.put(LOCAL_REST_API_SERVER + 'credit/source/view-update-delete/' + uuid + '/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  delete_source(uuid: string) {
    return this._http.delete(LOCAL_REST_API_SERVER + 'credit/source/view-update-delete/' + uuid + '/').pipe(
      catchError(errorResponse)
    )
  }

}