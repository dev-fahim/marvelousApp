import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { errorResponse } from 'src/app/common/error-response';

export interface FundListFilter {
  added: string
  fund_source: string
  max_amount: string
  min_amount: string
  ordering: string
  amount: string
  search: string
}

export interface FundStatus {
  is_not_locked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(private _http: HttpClient) { }

  get_all_funds(filters: FundListFilter = {
    added: '',
    amount: '',
    fund_source: '',
    max_amount: '',
    min_amount: '',
    ordering: '',
    search: ''
  }) {
    return this._http.get(LOCAL_REST_API_SERVER + 'credit/fund/list/', {
      params:
      {
        added: filters.added,
        amount: filters.amount,
        fund_source: filters.fund_source,
        max_amount: filters.max_amount,
        min_amount: filters.min_amount,
        ordering: filters.ordering,
        search: filters.search
      }
    })
  }

  add_funds(data: any) {
    return this._http.post(LOCAL_REST_API_SERVER + 'credit/fund/list-add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  get_fund_status() {
    return this._http.get<FundStatus>(LOCAL_REST_API_SERVER + 'credit/fund/settings/').pipe(
      catchError(errorResponse)
    )
  }

  update_fund_settings(data: boolean) {
    return this._http.put<FundStatus>(LOCAL_REST_API_SERVER + 'credit/fund/settings/edit/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  update_funds(data: any, uuid: string) {
    return this._http.put(LOCAL_REST_API_SERVER + 'credit/fund/view-update-delete/' + uuid + '/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  delete_funds(uuid: string) {
    return this._http.delete(LOCAL_REST_API_SERVER + 'credit/fund/view-update-delete/' + uuid + '/').pipe(
      catchError(errorResponse)
    )
  }
}
