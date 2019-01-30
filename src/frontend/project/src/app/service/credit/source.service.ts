import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError, map } from 'rxjs/operators';
import { errorResponse } from 'src/app/common/error-response';
import { CreditFundSourceGETModel, CreditFundSourceFilterModel } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SourceService {

  constructor(private _http: HttpClient) { }

  get_all_sources(filters: CreditFundSourceFilterModel) {
    return this._http.get<CreditFundSourceGETModel[]>(LOCAL_REST_API_SERVER + 'credit/source/list/', { params: {
      ordering: filters.ordering,
      search: filters.search
    } }).pipe(
      catchError(errorResponse)
    )
  }

  add_sources(data: any) {
    return this._http.post<CreditFundSourceGETModel>(LOCAL_REST_API_SERVER + 'credit/source/list-add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  update_source(data: any, uuid: string) {
    return this._http.put<CreditFundSourceGETModel>(LOCAL_REST_API_SERVER + 'credit/source/view-update-delete/' + uuid + '/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  delete_source(uuid: string) {
    return this._http.delete<CreditFundSourceGETModel>(LOCAL_REST_API_SERVER + 'credit/source/view-update-delete/' + uuid + '/').pipe(
      catchError(errorResponse)
    )
  }

  get_sources_name() {
    return this._http.get<CreditFundSourceGETModel[]>(LOCAL_REST_API_SERVER + 'credit/source/list/').pipe(
      map(
        (res: CreditFundSourceGETModel[]) => {
          let all_sources: string[] = [];
          for(let data of res) {all_sources.push(data.source_name)}
          return all_sources;
        }
      ),
      catchError(errorResponse)
    )
  }

}