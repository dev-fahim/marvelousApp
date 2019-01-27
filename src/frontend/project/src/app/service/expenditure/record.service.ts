import { ExpenditureRecordGETModel } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { errorResponse } from 'src/app/common/error-response';

const EXPENDITURE_RECORD_REST_API_URL = LOCAL_REST_API_SERVER + 'expenditure/record/'
export interface ExpenditureRecordModel {
  expend_by: string;
  description: string;
  amount: number;
  expend_date: string;
  expend_heading: string;
}

export interface SpecificExpenditureRecordModel {
  expend_by: string;
  description: string;
  amount: number;
  expend_date: string;
  expend_heading: string;
  is_verified: boolean;
}

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
    return this._http.get<ExpenditureRecordModel>(EXPENDITURE_RECORD_REST_API_URL + 'list/', {
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
      catchError(errorResponse)
    )
  }

  add_record(data: ExpenditureRecordModel) {
    return this._http.post(EXPENDITURE_RECORD_REST_API_URL + 'add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    );
  }

  get_specific_record(uuid: string) {
    return this._http.get<ExpenditureRecordGETModel>(EXPENDITURE_RECORD_REST_API_URL + 'view/' + uuid + '/').pipe(
      catchError(errorResponse)
      )
  }

  update_record(data: SpecificExpenditureRecordModel, uuid: string) {
    return this._http.put<SpecificExpenditureRecordModel>(
      EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/', data
    ).pipe(
      catchError(errorResponse)
    );
  }

  delete_record(uuid: string) {
    return this._http.delete(EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/').pipe(
      catchError(errorResponse)
    );
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
      catchError(errorResponse)
    )
  }
}
