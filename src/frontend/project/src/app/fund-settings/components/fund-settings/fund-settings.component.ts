import { AuthService } from './../../../login/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { RootObject } from 'src/app/service/models';

@Component({
  selector: 'app-fund-settings',
  templateUrl: './fund-settings.component.html',
  styleUrls: ['./fund-settings.component.scss']
})
export class FundSettingsComponent implements OnInit {
  is_there_all_okay: boolean = false;
  fund_status = true;
  api_services: RootObject = {
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
    "this_year": new Date()
}

  constructor(private _auth: AuthService) { }

  get_api_services() {
    this._auth.getUserPermission()
      .subscribe(
        (response) => {
          this.fund_status = response.fund_status;
          return this.api_services = response;
        }
      )
  }

  ngOnInit() {
    this.get_api_services()
  }

  onAllOkay(all_okay: boolean = false) {
    console.log(all_okay);
    this.is_there_all_okay = all_okay;
  }

  get is_all_okay() {
    return this.is_there_all_okay;
  }

  get status() {
    return this.fund_status;
  }

  toggle_fund() {
    return this._auth.change_fund_status(!this.status)
      .subscribe(
        (response) => {
          return this.fund_status = response.is_not_locked;
        }
      )
  }

}
