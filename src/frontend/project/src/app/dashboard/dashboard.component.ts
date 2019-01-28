import { AuthService } from './../login/auth/auth.service';
import { RootObject } from './../service/models';
import { UserStoreService } from './../../store/user.store.service';
import { Component } from '@angular/core';
import { SourceService } from '../service/credit/source.service';
import { HeadingService } from '../service/expenditure/heading.service';
import { RecordService } from '../service/expenditure/record.service';
import { today_date } from '../service/today.date';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'project';
  fund_status = true;
  all_sources: any;
  all_headings: any;
  todays_all_expenditures: any[] = [];
  myDate: any;
  loading = true;
  arr = [1,2,3,4]
  today = today_date();
  api_services: RootObject = {
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

  constructor(
    public sourceService: SourceService,
    public headingService: HeadingService,
    public recordService: RecordService,
    private _auth: AuthService
  ) {
  }

  toggle_fund() {
    return this._auth.change_fund_status(!this.status)
      .subscribe(
        (response) => {
          return this.fund_status = response.is_not_locked;
        }
      )
  }

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
    
    this.sourceService.get_all_sources({ordering: '', search: ''})
      .subscribe(
        (result) => {
          this.loading = false;
          return this.all_sources = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
    this.headingService.get_all_headings()
      .subscribe(
        (result) => {
          this.loading = false;
          return this.all_headings = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
    this.recordService.get_all_expenditures({
      is_verified: '',
      amount: '',
      max_amount: '',
      min_amount: '',
      added_after: '',
      added_before: '',
      expend_date_after: '',
      expend_date_before: '',
      added_date: this.today,
      heading: '',
      search: '',
      ordering: ''
    })
      .subscribe(
        (result: any) => {
          this.loading = false;
          return this.todays_all_expenditures = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
  }

  get_fund_status() {
    return this.api_services.fund_status;
  }

  get_expend_length() {
    return this.todays_all_expenditures.length
  }

  get_this_month_total_expend() {
    return this.api_services.this_month_total_expend_amount;
  }

  get_total_unauthorized_expend() {
    return this.api_services.total_unauthorized_expend_amount;
  }

  get_remailning_balance() {
    return this.api_services.remaining_credit_fund_amount;
  }

  get_starting_balance() {
    return this.api_services.todays_open_credit_fund;
  }

  is_loading() {
    return this.loading;
  }

  get status() {
    return this.fund_status;
  }

  onReload() {
    this.ngOnInit();
  }
}
