import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';

const EXPENDITURE_RECORD_REST_API_URL = LOCAL_REST_API_SERVER + 'expenditure/record/'
export interface ExpenditureRecordModel {
    expend_by: string;
    description: string;
    amount: number;
    expend_time: string;
    expend_heading: string;
}

export interface SpecificExpenditureRecordModel {
  expend_by: string;
  description: string;
  amount: number;
  expend_time: string;
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
  expend_time_after?: string;
  expend_time_before?: string;
  added_date?: string;
  heading?: string;
  search?: string;
  ordering?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private _http: HttpClient) { }

  get_all_expenditures(filters: ExpenditureRecordFilter) {
    return this._http.get<ExpenditureRecordModel>(EXPENDITURE_RECORD_REST_API_URL + 'list/', {
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
        search: filters.search,
        ordering: filters.ordering
      }
    })
  }

  add_record(data: ExpenditureRecordModel) {
    return this._http.post(EXPENDITURE_RECORD_REST_API_URL + 'add/', JSON.stringify(data))
  }

  get_specific_record(uuid=''){
    return this._http.get<SpecificExpenditureRecordModel>(EXPENDITURE_RECORD_REST_API_URL + 'view/' + uuid + '/')
  }

  update_record(data: SpecificExpenditureRecordModel, uuid: string) {
    return this._http.put<SpecificExpenditureRecordModel>(
      EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/', data
      )
  }

  delete_record(uuid: string) {
    return this._http.delete(EXPENDITURE_RECORD_REST_API_URL + 'view-update-delete/' + uuid + '/')
  }
}
