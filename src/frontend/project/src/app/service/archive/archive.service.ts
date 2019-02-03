import { EXPENDITURE_RECORD_REST_API_URL } from './../expenditure/record.service';
import { CREDIT_SOURCE_API } from './../credit/source.service';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as models from '../models';
import * as common from '../../common';
import { throwError } from 'rxjs';

export const CREDIT_ARCHIVE_API_URL = LOCAL_REST_API_SERVER + 'archive-app/fund/archive/';
export const EXPENDITURE_RECORD_ARCHIVE_API_URL = LOCAL_REST_API_SERVER + 'archive-app/record/archive/';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private _http: HttpClient) { }

  get_all_funds_archive() {
    return this._http.get<models.CreditFundRecordGETModel[]>(CREDIT_ARCHIVE_API_URL).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_all_expenditures_archive() {
    return this._http.get<models.ExpenditureRecordGETModel[]>(EXPENDITURE_RECORD_ARCHIVE_API_URL).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  restore_fund(uuid: string, payloads: models.CreditFundRecordPUTModel) {
    return this._http.put<models.CreditFundSourcePUTModel>(CREDIT_SOURCE_API + 'view-update-delete/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  restore_expend(uuid: string, payloads: models.ExpenditureRecordPUTModel) {
    return this._http.put<models.ExpenditureRecordPUTModel>(EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }
}
