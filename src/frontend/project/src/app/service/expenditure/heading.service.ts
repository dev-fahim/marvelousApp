import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { errorResponse } from 'src/app/common/error-response';

export interface HeadingGETModel {
  id: number ;
  heading_name: string ;
  description: string ;
  uuid: string ;
  added: string ;
  updated: string ;
}

export interface HeadingModel {
  heading_name: string ;
  description: string ;
}
@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  constructor(private _http: HttpClient) { }

  get_all_headings() {
    return this._http.get<HeadingGETModel[]>(LOCAL_REST_API_SERVER + 'expenditure/heading/list/').pipe(
      catchError(errorResponse)
    )
  }

  add_heading(data: HeadingModel) {
    return this._http.post<HeadingModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/list-add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  update_heading(data: HeadingModel, uuid: string) {
    return this._http.put<HeadingModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view-update-delete/' + uuid +'/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  delete_heading(uuid: string) {
    return this._http.delete<HeadingModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view-update-delete/' + uuid +'/').pipe(
      catchError(errorResponse)
    )
  }

}
