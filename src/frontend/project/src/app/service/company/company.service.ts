import { map, catchError } from 'rxjs/operators';
import { CompnayInfoGETModel } from './../models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOCAL_REST_API_SERVER } from '../server.url';
import { throwError } from 'rxjs';
import * as common from '../../common';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private _http: HttpClient) { }

  get_company() {
    return this._http.get<CompnayInfoGETModel>(LOCAL_REST_API_SERVER + 'company/view/').pipe(
      map(
        (response: CompnayInfoGETModel) => {
          return response;
        },
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
      )
    )
  }

  edit_company(payloads: CompnayInfoGETModel) {
    return this._http.post<CompnayInfoGETModel>(LOCAL_REST_API_SERVER + 'company/edit/', payloads).pipe(
      map(
        (response: CompnayInfoGETModel) => {
          return response;
        },
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
      )
    )
  }
}
