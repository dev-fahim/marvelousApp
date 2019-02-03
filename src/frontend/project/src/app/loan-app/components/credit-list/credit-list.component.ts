import { LoanCreditGETModel } from './../../../service/models';
import { LoanService } from './../../../service/loan/loan.service';
import { CreditFundRecordGETModel } from 'src/app/service/models';
import { Component, OnInit } from '@angular/core';
import { FundService, CreditFundRecordListFilter } from 'src/app/service/credit/fund.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as errors from '../../../common';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {
  loading = false;
  all_credit_fund_records: LoanCreditGETModel[] = [];
  messages: { message: string, type: string }[] = [];
  added = '';
  amount = '';
  fund_source = '';
  max_amount = '';
  min_amount = '';
  added_after = '';
  added_before = '';
  search = '';
  ordering = '';
  show_modal = false;

  filter_array = [
    'added',
    'amount',
    'fund_source',
    'max_amount',
    'min_amount',
    'added_after',
    'added_before',
    'search',
    'ordering'
  ]

  constructor(
    private _fundService: FundService,
    private _router: Router, 
    private _acRoute: ActivatedRoute,
    private _loanService: LoanService
    ) { }

  toggle_modal() {
    return this.show_modal = !this.show_modal
  }

  ngOnInit(filters: CreditFundRecordListFilter = {
    added: '',
    amount: '',
    fund_source: '',
    max_amount: '',
    min_amount: '',
    added_after: '',
    added_before: '',
    ordering: '',
    search: ''
  }, is_filtered = false) {
    this.loading = true;
    if (is_filtered) {
      for (let data of this.filter_array) {
        if (filters[data] == null) {
          this[data] = '';
        } else {
          this[data] = filters[data];
        }
      }
    } else {
      this._acRoute.queryParamMap.subscribe(
        (params) => {
          for (let data of this.filter_array) {
            if (params.get(data) == null) {
              this[data] = '';
            } else {
              this[data] = params.get(data);
            }
          }
        })
    }
    this._loanService.get_all_funds({
      added: this.added,
      amount: this.amount,
      fund_source: this.fund_source,
      max_amount: this.max_amount,
      min_amount: this.min_amount,
      added_after: this.added_after,
      added_before: this.added_before,
      search: this.search,
      ordering: this.ordering
    })
      .subscribe(
        (next) => {
          this.loading = false;
          let data = [];
          for (const record of next) {
            if (record.is_deleted === false) {data.push(record)}
          }
          this.all_credit_fund_records = data;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
  }

  onFilterData(filters: CreditFundRecordListFilter) {
    return this.ngOnInit(filters, true); // Todo: Check if filtering has errors,
  }

  onReload() {
    return this.ngOnInit();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  onAddData(data: LoanCreditGETModel) {
    this.all_credit_fund_records.splice(0, 0, data);
  }

  get_sum_amount() {
    let amounts = [];
    for (let data of this.all_credit_fund_records) {
      amounts.push(data.amount);
    }
    let sum = 0;

    for (let amount of amounts) {
      sum = sum + amount;
    }

    return {
      'amount': sum
    }
  }
}
