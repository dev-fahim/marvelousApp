import { RootObject } from 'src/app/service/models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export const UserInitialState: RootObject = {
  "account_status": {
    "is_active": false,
    "is_approved": false,
    "is_locked": false
  },
  "fund_status": false,
  "is_base_user": false,
  "is_sub_user": false,
  "remaining_credit_fund_amount": 0,
  "this_month_total_expend_amount": 0,
  "todays_open_credit_fund": 0,
  "total_credit_fund_amount": 0,
  "total_unauthorized_expend_amount": 0,
  "user_permissions": {
    "canAdd": false,
    "canEdit": false,
    "canFundSourceEdit": false,
    "canFundSourceListCreate": false,
    "canList": false,
    "canRetrieve": false,
    "is_active": false,
    "user_type": ""
  }
}



@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private _user = new Subject<RootObject>();

  constructor() { }

  get_user() {
    return this._user;
  }

  set_user(payload: RootObject) {
    this._user.next(payload);
  }
}
