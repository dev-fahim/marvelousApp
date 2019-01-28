import { LOCAL_REST_API_SERVER, LOCAL_SERVER } from './../../service/server.url';
import { UserModel, BaseUserInfoGETModel, SubUserPOSTModel, SubUserInfoGETModel, UserEditModel } from './../../service/models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';
import * as common from '../../common';
import { RootObject } from 'src/app/service/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  loginUser(credentials: { username: string, password: string }) {
    return this._http.post(LOCAL_SERVER + 'rest-auth/login/', credentials).pipe(
      map(
        (response) => {
          return response
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  getUserPermission() {
    return this._http.get<RootObject>(LOCAL_REST_API_SERVER + 'service/what-do-you-want/').pipe(
      map(
        (response: RootObject) => { return response }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    );
  }

  change_fund_status(status: boolean) {
    return this._http.put(LOCAL_REST_API_SERVER + "credit/fund/settings/edit/", JSON.stringify({is_not_locked: status})).pipe(
      map(
        (response: {is_not_locked: boolean}) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  is_logged_in() {
    const helper = new JwtHelperService();
    const rawToken = localStorage.getItem('access_token');

    if (rawToken != undefined || rawToken != '') {
      const isExpired = helper.isTokenExpired(rawToken);
      return !isExpired;
    }
    return false;
  }

  get_user_general_information() {
    return this._http.get<UserModel>(LOCAL_SERVER + 'rest-auth/user/').pipe(
      map(
        (response: UserModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(common.get_http_response_error(error));
        }
      )
    )
  }

  edit_user_general_information(credentials: UserEditModel) {
    return this._http.post<UserEditModel>(LOCAL_SERVER  + 'rest-auth/user/edit/', credentials).pipe(
      map(
        (response: UserEditModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  get_base_user() {
    return this._http.get<BaseUserInfoGETModel>(LOCAL_REST_API_SERVER + 'base-user/view/').pipe(
      map(
        (response: BaseUserInfoGETModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  get_all_sub_user() {
    return this._http.get<SubUserInfoGETModel[]>(LOCAL_REST_API_SERVER + 'sub-user/list/').pipe(
      map(
        (response: SubUserInfoGETModel[]) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  get_sub_user() {
    return this._http.get<SubUserInfoGETModel>(LOCAL_REST_API_SERVER + 'sub-user/view/').pipe(
      map(
        (response: SubUserInfoGETModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  get_sub_user_by_uuid(uuid: string) {
    return this._http.get<SubUserInfoGETModel>(LOCAL_REST_API_SERVER + 'sub-user/edit/' + uuid + '/').pipe(
      map(
        (response: SubUserInfoGETModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  add_sub_user(credentials: SubUserPOSTModel) {
    return this._http.post<SubUserPOSTModel>(LOCAL_REST_API_SERVER + 'sub-user/add/', JSON.stringify(credentials)).pipe(
      map(
        (response: SubUserPOSTModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  edit_sub_user_by_uuid(uuid: string, credentials: SubUserPOSTModel) {
    return this._http.put<SubUserInfoGETModel>(LOCAL_REST_API_SERVER + 'sub-user/edit/' + uuid + '/', credentials).pipe(
      map(
        (response: SubUserInfoGETModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

  delete_sub_user_by_uuid(uuid: string) {
    return this._http.delete<SubUserInfoGETModel>(LOCAL_REST_API_SERVER + 'sub-user/edit/' + uuid + '/').pipe(
      map(
        (response: SubUserInfoGETModel) => {
          return response;
        }
      ),
      catchError(
        (error: HttpErrorResponse) => {
          return throwError(error);
        }
      )
    )
  }

}
