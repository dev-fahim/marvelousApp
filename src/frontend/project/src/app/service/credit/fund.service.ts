import { CreditFundRecordGETModel } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError, map } from 'rxjs/operators';
import { errorResponse } from 'src/app/common/error-response';

export interface CreditFundRecordListFilter {
  added: string;
  fund_source: string;
  max_amount: string;
  min_amount: string;
  ordering: string;
  added_after: string;
  added_before: string;
  amount: string;
  search: string;
}

export interface FundStatus {
  is_not_locked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FundService {

  constructor(private _http: HttpClient) { }

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
    return this._http.get<CreditFundRecordGETModel[]>(LOCAL_REST_API_SERVER + 'credit/fund/list/', {
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
    })
  }

  add_funds(data: any) {
    return this._http.post<CreditFundRecordGETModel>(LOCAL_REST_API_SERVER + 'credit/fund/list-add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  get_specific_fund_record(uuid: string) {
    return this._http.get<CreditFundRecordGETModel>(LOCAL_REST_API_SERVER + 'credit/fund/view/' + uuid + '/').pipe(
      catchError(errorResponse)
    )
  }
  
  get_fund_status() {
    return this._http.get<FundStatus>(LOCAL_REST_API_SERVER + 'credit/fund/settings/').pipe(
      map(
        (next: FundStatus) => {
          return next.is_not_locked;
        }
      ),
      catchError(errorResponse)
    )
  }

  update_fund_settings(data: boolean) {
    return this._http.put<FundStatus>(LOCAL_REST_API_SERVER + 'credit/fund/settings/edit/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  update_funds(data: any, uuid: string) {
    return this._http.put<CreditFundRecordGETModel>(LOCAL_REST_API_SERVER + 'credit/fund/view-update-delete/' + uuid + '/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  delete_funds(uuid: string) {
    return this._http.delete<CreditFundRecordGETModel>(LOCAL_REST_API_SERVER + 'credit/fund/view-update-delete/' + uuid + '/').pipe(
      catchError(errorResponse)
    )
  }
}
