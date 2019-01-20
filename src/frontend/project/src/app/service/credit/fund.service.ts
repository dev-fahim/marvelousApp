import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';

export interface FundListFilter {
  added: string
  fund_source: string
  max_amount: string
  min_amount: string
  ordering: string
  amount: string
  search: string
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
    return this._http.get(LOCAL_REST_API_SERVER + 'credit/fund/list-add/', {
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
    return this._http.post(LOCAL_REST_API_SERVER + 'credit/fund/list-add/', JSON.stringify(data))
  }
}
