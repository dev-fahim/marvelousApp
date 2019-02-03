import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError, map } from 'rxjs/operators';
import * as common from '../../common';
import * as models from '../models';
import { throwError } from 'rxjs';

export const CREDIT_SOURCE_API = LOCAL_REST_API_SERVER + 'credit/source/';

@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private _http: HttpClient) { }

  get_all_sources(filters: models.CreditFundSourceFilterModel) {
    return this._http.get<models.CreditFundSourceGETModel[]>(CREDIT_SOURCE_API + 'list/', { 
      params: {
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

  add_sources(data: any) {
    return this._http.post<models.CreditFundSourcePOSTModel>(CREDIT_SOURCE_API + 'list-add/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  update_source(data: any, uuid: string) {
    return this._http.put<models.CreditFundSourcePUTModel>(CREDIT_SOURCE_API + 'view-update-delete/' + uuid + '/', JSON.stringify(data)).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  delete_source(payloads: models.CreditFundSourcePUTModel, uuid: string) {
    return this._http.put<models.CreditFundSourcePUTModel>(CREDIT_SOURCE_API + 'view-update-delete/' + uuid + '/', payloads).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

  get_sources_name() {
    return this._http.get<models.CreditFundSourceGETModel[]>(CREDIT_SOURCE_API + 'list/').pipe(
      map(
        (res: models.CreditFundSourceGETModel[]) => {
          let all_sources: string[] = [];
          for(let data of res) {all_sources.push(data.source_name)}
          return all_sources;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error))
        }
      )
    )
  }

}