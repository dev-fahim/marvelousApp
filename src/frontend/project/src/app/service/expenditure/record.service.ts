import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as common from '../../common';
import * as models from '../models';
import { throwError } from 'rxjs';

export const EXPENDITURE_RECORD_REST_API_URL = LOCAL_REST_API_SERVER + 'expenditure/record/'

export interface ExpenditureRecordFilter {
  is_verified?: string;
  amount?: string;
  max_amount?: string;
  min_amount?: string;
  added_after?: string;
  added_before?: string;
  expend_date_after?: string;
  expend_date_before?: string;
  added_date?: string;
  heading?: string;
  search?: string;
  ordering?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private _http: HttpClient, private _router: Router) { }

  get_all_expenditures(filters: ExpenditureRecordFilter) {
    return this._http.get<models.ExpenditureRecordGETModel[]>(EXPENDITURE_RECORD_REST_API_URL + 'list/', {
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

  add_record(data: models.ExpenditureRecordPOSTModel) {
    return this._http.post(EXPENDITURE_RECORD_REST_API_URL + 'add/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    );
  }

  get_specific_record(uuid: string) {
    return this._http.get<models.ExpenditureRecordGETModel>(EXPENDITURE_RECORD_REST_API_URL + 'view/' + uuid + '/').pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
      )
  }

  update_record(data: models.ExpenditureRecordPUTModel, uuid: string) {
    return this._http.put<models.ExpenditureRecordPUTModel>(
      EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/', data
    ).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    );
  }

  delete_record(uuid: string, payloads: models.ExpenditureRecordPUTModel) {
    return this._http.put<models.ExpenditureRecordPUTModel>(EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_csv(filters: ExpenditureRecordFilter) {
    return this._http.get(LOCAL_REST_API_SERVER + 'expenditure/records-report-pdf/', {
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
}
