import { ExpenditureHeadingGETModel } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './../server.url';
import { catchError } from 'rxjs/operators';
import { errorResponse } from 'src/app/common/error-response';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  constructor(private _http: HttpClient) { }

  get_all_headings(search = '') {
    return this._http.get<ExpenditureHeadingGETModel[]>(LOCAL_REST_API_SERVER + 'expenditure/heading/list/', {params: {'search': search}}).pipe(
      catchError(errorResponse)
    )
  }

  add_heading(data: ExpenditureHeadingGETModel) {
    return this._http.post<ExpenditureHeadingGETModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/list-add/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  update_heading(data: ExpenditureHeadingGETModel, uuid: string) {
    return this._http.put<ExpenditureHeadingGETModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view-update-delete/' + uuid +'/', JSON.stringify(data)).pipe(
      catchError(errorResponse)
    )
  }

  delete_heading(uuid: string) {
    return this._http.delete<ExpenditureHeadingGETModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view-update-delete/' + uuid +'/').pipe(
      catchError(errorResponse)
    )
  }

  get_specific_heading(uuid: string) {
    return this._http.get<ExpenditureHeadingGETModel>(LOCAL_REST_API_SERVER + 'expenditure/heading/view/' + uuid +'/').pipe(
      catchError(errorResponse)
    )
  }

}
