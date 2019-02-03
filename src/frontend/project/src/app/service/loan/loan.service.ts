import { Router } from '@angular/router';
import { CreditFundRecordListFilter } from 'src/app/service/credit/fund.service';
import { ExpenditureRecordFilter } from './../expenditure/record.service';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as models from '../models';
import * as common from '../../common';
import { throwError } from 'rxjs';

export const CREDIT_LOAN_API_URL = LOCAL_REST_API_SERVER + 'loan/credit/';
export const EXPENDITURE_RECORD_LOAN_API_URL = LOCAL_REST_API_SERVER + 'loan/expend/';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private _http: HttpClient, private _router: Router) { }

  get_all_expenditures(filters: ExpenditureRecordFilter) {
    return this._http.get<models.LoanExpendGETModel[]>(EXPENDITURE_RECORD_LOAN_API_URL + 'list/', {
      params: {
        is_verified: filters.is_verified,
        amount: filters.amount,
        max_amount: filters.max_amount,
        min_amount: filters.min_amount,
        added_after: filters.added_after,
        added_before: filters.added_before,
        expend_date_after: filters.expend_date_after,
        expend_date_before: filters.expend_date_before,
        added_date: filters.added_date,
        heading: filters.heading,
        search: filters.search,
        ordering: filters.ordering
      }
    }).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  add_record(data: models.LoanExpendPOSTModel) {
    return this._http.post(EXPENDITURE_RECORD_LOAN_API_URL + 'add/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    );
  }

  get_specific_record(uuid: string) {
    return this._http.get<models.LoanExpendGETModel>(EXPENDITURE_RECORD_LOAN_API_URL + 'edit/' + uuid + '/').pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
      )
  }

  update_record(data: models.LoanExpendPUTModel, uuid: string) {
    return this._http.put<models.ExpenditureRecordPUTModel>(
      EXPENDITURE_RECORD_LOAN_API_URL + 'edit/' + uuid + '/', data
    ).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    );
  }

  delete_record(uuid: string, payloads: models.LoanExpendPUTModel) {
    return this._http.put<models.ExpenditureRecordPUTModel>(EXPENDITURE_RECORD_LOAN_API_URL + 'edit/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_all_funds(filters: CreditFundRecordListFilter = {
    added: '',
    amount: '',
    fund_source: '',
    max_amount: '',
    min_amount: '',
    added_after: '',
    added_before: '',
    ordering: '',
    search: ''
  }) {
    return this._http.get<models.LoanCreditGETModel[]>(CREDIT_LOAN_API_URL + 'list/', {
      params:
      {
        added: filters.added,
        amount: filters.amount,
        fund_source: filters.fund_source,
        max_amount: filters.max_amount,
        min_amount: filters.min_amount,
        added_after: filters.added_after,
        added_before: filters.added_before,
        ordering: filters.ordering,
        search: filters.search
      }
    }).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  add_funds(data: any) {
    return this._http.post<models.LoanCreditPOSTModel>(CREDIT_LOAN_API_URL + 'list-add/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_specific_fund_record(uuid: string) {
    return this._http.get<models.LoanCreditGETModel>(CREDIT_LOAN_API_URL + 'edit/' + uuid + '/').pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  update_funds(data: any, uuid: string) {
    return this._http.put<models.LoanCreditPUTModel>(CREDIT_LOAN_API_URL + 'edit/' + uuid + '/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  delete_funds(uuid: string) {
    return this._http.delete<models.LoanCreditPUTModel>(CREDIT_LOAN_API_URL + 'edit/' + uuid + '/').pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }
}
