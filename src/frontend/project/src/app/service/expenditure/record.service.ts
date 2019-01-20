import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';

export interface ExpenditureRecordFilter {
  is_verified?: string;
  amount?: string;
  max_amount?: string;
  min_amount?: string;
  added_after?: string;
  added_before?: string;
  expend_time_after?: string;
  expend_time_before?: string;
  added_date?: string;
  heading?: string;
  ordering?: string;
  serach?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private _http: HttpClient) { }

  get_all_expenditures(filters: ExpenditureRecordFilter = {
    is_verified: '',
    amount: '',
    max_amount: '',
    min_amount: '',
    added_after: '',
    added_before: '',
    expend_time_after: '',
    expend_time_before: '',
    added_date: '',
    heading: '',
    ordering: '',
    serach: '',
  }) {
    return this._http.get(LOCAL_REST_API_SERVER + 'expenditure/record/list/', {
      params: {
        is_verified: filters.is_verified,
        amount: filters.amount,
        max_amount: filters.max_amount,
        min_amount: filters.min_amount,
        added_after: filters.added_after,
        added_before: filters.added_before,
        expend_time_after: filters.expend_time_after,
        expend_time_before: filters.expend_time_before,
        added_date: filters.added_date,
        heading: filters.heading,
        ordering: filters.ordering,
        serach: filters.serach,
      }
    })
  }
}
