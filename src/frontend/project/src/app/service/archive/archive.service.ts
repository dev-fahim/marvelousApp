import { CREDIT_LOAN_API_URL, EXPENDITURE_RECORD_LOAN_API_URL } from './../loan/loan.service';
import { EXPENDITURE_RECORD_REST_API_URL } from './../expenditure/record.service';
import { CREDIT_SOURCE_API } from './../credit/source.service';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as models from '../models';
import * as common from '../../common';
import { throwError } from 'rxjs';

export const CREDIT_ARCHIVE_API_URL = LOCAL_REST_API_SERVER + 'archive-app/credit/archives/';
export const EXPENDITURE_RECORD_ARCHIVE_API_URL = LOCAL_REST_API_SERVER + 'archive-app/expenditure/archives/';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private _http: HttpClient) { }

  get_all_funds_archive(search: string = "") {
    return this._http.get<models.CreditHistoryModel[]>(CREDIT_ARCHIVE_API_URL + '?search=' + search).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_all_expenditures_archive(search: string = "") {
    return this._http.get<models.ExpenditureHistoryModel[]>(EXPENDITURE_RECORD_ARCHIVE_API_URL + '?search=' + search).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  restore_fund_refundale(uuid: string, payloads: models.LoanCreditPUTModel) {
    return this._http.put<models.CreditFundSourcePUTModel>(CREDIT_LOAN_API_URL + 'edit/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  restore_fund_non_refundable(uuid: string, payloads: models.CreditFundRecordPUTModel) {
    return this._http.put<models.CreditFundSourcePUTModel>(CREDIT_SOURCE_API + 'view-update-delete/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  restore_expend_refundable(uuid: string, payloads: models.ExpenditureRecordPUTModel) {
    return this._http.put<models.ExpenditureRecordPUTModel>(EXPENDITURE_RECORD_LOAN_API_URL + 'edit/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  restore_expend_non_refundable(uuid: string, payloads: models.ExpenditureRecordPUTModel) {
    return this._http.put<models.ExpenditureRecordPUTModel>(EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }
}
