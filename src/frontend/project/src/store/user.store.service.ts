import { RootObject } from 'src/app/service/models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export const UserInitialState: RootObject = {
  "is_base_user": false,
  "is_sub_user": false,
  "user_permissions": {
    "canAdd": false,
    "canEdit": false,
    "canList": false,
    "canRetrieve": false,
    "canFundSourceListCreate": false,
    "canFundSourceEdit": false,
    "is_active": false,
    "user_type": ""
  },
  "account_status": {
    "is_approved": false,
    "is_locked": false,
    "is_active": false
  },
  "todays_open_credit_fund": 0,
  "remaining_credit_fund_amount": 0,
  "this_month_total_expend_amount": 0,
  "total_unauthorized_expend_amount": 0,
  "total_credit_fund_amount": 0,
  "fund_status": false,
  "this_year_total_expend_amoun": 0,
  "this_year_remaining_credit_fund_amount": 0,
  "this_year_total_credit_fund_amount": 0,
  "this_year_total_unauthorized_expend_amount": 0,
  "this_month_total_credit_fund_amount": 0,
  "this_year": ""
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
