import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as models from '../models';
import * as common from '../../common';
import { throwError } from 'rxjs';

export const CREDIT_HISTORY_API_URL = LOCAL_REST_API_SERVER + 'credit/fund/history/';
export const EXPENDITURE_RECORD_HISTORY_API_URL = LOCAL_REST_API_SERVER + 'expenditure/record/history/';

@Injectable({
  providedIn: 'root'
})
export class BackAppService {

  constructor(private _http: HttpClient) { }

  get_all_funds_history() {
    return this._http.get<models.CreditFundRecordGETModel[]>(CREDIT_HISTORY_API_URL).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_all_expenditures_history() {
    return this._http.get<models.ExpenditureRecordGETModel[]>(EXPENDITURE_RECORD_HISTORY_API_URL).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }
}
