import { ExpenditureHeadingPUTModel } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as common from '../../common';
import * as models from '../models';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  constructor(private _http: HttpClient) { }

  get_all_headings(search = '') {
    return this._http.get<models.ExpenditureHeadingGETModel[]>(LOCAL_REST_API_SERVER + 'expenditure/heading/list/', {params: {'search': search}}).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  add_heading(data: models.ExpenditureHeadingPOSTModel) {
    return this._http.post<models.ExpenditureHeadingPOSTModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/list-add/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  update_heading(data: models.ExpenditureHeadingPUTModel, uuid: string) {
    return this._http.put<models.ExpenditureHeadingPUTModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view-update-delete/' + uuid +'/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  delete_heading(payloads: ExpenditureHeadingPUTModel, uuid: string) {
    return this._http.put<models.ExpenditureHeadingPUTModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view-update-delete/' + uuid +'/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  get_specific_heading(uuid: string) {
    return this._http.get<models.ExpenditureHeadingGETModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view/' + uuid +'/').pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

}
