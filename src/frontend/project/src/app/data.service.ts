import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LOCAL_REST_API_SERVER } from './service/server.url';

export interface SubUserModel {
  user_type: string;
  joined: string;
  urls: string;
  canAdd: boolean;
  canRetrieve: boolean;
  canEdit: boolean;
  canList: boolean;
  uuid: string;
}

export interface BaseUserModel {
  id: number;
  is_admin: boolean;
  uuid: string;
  joined: string;
  last_updated: string;
  base_user: number;
}

export interface UserModel {
  id: number;
  is_approved: boolean;
  is_not_locked: boolean;
  is_active: boolean;
  base_user: boolean;
  sub_user: boolean;
  user: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private is_sub_user = new BehaviorSubject(false);
  get_is_sub_user = this.is_sub_user.asObservable();
  private is_base_user = new BehaviorSubject(false);
  get_is_base_user = this.is_base_user.asObservable();

  private canList = new BehaviorSubject(false);
  get_canList = this.canList.asObservable();
  private canEdit = new BehaviorSubject(false);
  get_canEdit = this.canEdit.asObservable();
  private canRetrieve = new BehaviorSubject(false);
  get_canRetrieve = this.canRetrieve.asObservable();
  private canAdd = new BehaviorSubject(false);
  get_canAdd = this.canAdd.asObservable();

  private is_approved = new BehaviorSubject(false);
  get_is_approved = this.is_approved.asObservable();
  private is_not_locked = new BehaviorSubject(false);
  get_is_not_locked = this.is_not_locked.asObservable();
  private is_active = new BehaviorSubject(false);
  get_is_active = this.is_active.asObservable();

  private uuid = new BehaviorSubject('');
  get_uuid = this.uuid.asObservable();

  private user_type = new BehaviorSubject('');
  get_user_type = this.user_type.asObservable();

  constructor(private _http: HttpClient) { }

  get_user() {
    return this._http.get<UserModel>(LOCAL_REST_API_SERVER + 'user/extra/view/');
  }

  get_sub_user() {
    return this._http.get<SubUserModel>(LOCAL_REST_API_SERVER + 'user/view/');
  }

  get_base_user() {
    return this._http.get<BaseUserModel>(LOCAL_REST_API_SERVER + 'user/view/');
  }

  ch_canAdd(value: boolean) {
    this.canAdd.next(value);
  }
  ch_canList(value: boolean) {
    this.canList.next(value);
  }
  ch_canRetrieve(value: boolean) {
    this.canRetrieve.next(value);
  }
  ch_canEdit(value: boolean) {
    this.canEdit.next(value);
  }
  all_access() {
    this.canAdd.next(true);
    this.canEdit.next(true);
    this.canRetrieve.next(true);
    this.canList.next(true);
  }

  ch_is_approved(value: boolean) {
    this.is_approved.next(value);
  }
  ch_is_not_locked(value: boolean) {
    this.is_not_locked.next(value);
  }
  ch_is_active(value: boolean) {
    this.is_active.next(value);
  }

  ch_uuid(value: string) {
    this.uuid.next(value);
  }

  ch_user_type(value: string) {
    this.user_type.next(value);
  }

  ch_is_sub_user(value: boolean) {
    this.is_sub_user.next(value);
  }

  ch_is_base_user(value: boolean) {
    this.is_base_user.next(value);
  }
}
