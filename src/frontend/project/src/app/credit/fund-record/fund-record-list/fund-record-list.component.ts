import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { NotFound } from 'src/app/common/not-found';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from 'src/app/common/bad-input';
import { CreditFundRecordGETModel } from 'src/app/service/models';
import { Component, OnInit } from '@angular/core';
import { FundService, CreditFundRecordListFilter } from 'src/app/service/credit/fund.service';
import { AppError } from 'src/app/common/app-error';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fund-record-list',
  templateUrl: './fund-record-list.component.html',
  styleUrls: ['./fund-record-list.component.scss']
})
export class FundRecordListComponent implements OnInit {
  loading = false;
  all_credit_fund_records: CreditFundRecordGETModel[] = [];
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

  constructor(private _fundService: FundService, private _router: Router, private _acRoute: ActivatedRoute) { }

  throw_error(error: AppError) {
    if (error instanceof BadInput) {
      return this.messages.splice(0, 0, { message: 'You have entered invalid data or fund is limited. All fields and required and must be valid.', type: 'error' });
    }
    if (error instanceof Forbidden) {
      return this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
    }
    if (error instanceof NotFound) {
      return this.messages.splice(0, 0, { message: '404 Not Found', type: 'error' });
    }
    if (error instanceof UnAuthorized) {
      this._router.navigate(['/login'])
      return this.messages.splice(0, 0, { message: 'You are not logged in.', type: 'error' });
    }
    if (error instanceof ServerError) {
      return this.messages.splice(0, 0, { message: 'Internal Server Error.', type: 'error' });
    }
    return this.messages.splice(0, 0, { message: 'An unexpected error occured.', type: 'error' });
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
    this._fundService.get_all_funds({
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
          this.all_credit_fund_records = next;
        },
        (error: AppError) => {
          this.loading = false;
          return this.throw_error(error);
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

  onAddData(data: CreditFundRecordGETModel) {
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
