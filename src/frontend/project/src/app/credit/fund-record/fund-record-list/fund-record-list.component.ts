import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { NotFound } from 'src/app/common/not-found';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from 'src/app/common/bad-input';
import { CreditFundRecordGETModel } from 'src/app/service/models';
import { Component, OnInit } from '@angular/core';
import { FundService, CreditFundRecordListFilter } from 'src/app/service/credit/fund.service';
import { AppError } from 'src/app/common/app-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fund-record-list',
  templateUrl: './fund-record-list.component.html',
  styleUrls: ['./fund-record-list.component.scss']
})
export class FundRecordListComponent implements OnInit {
  loading = false;
  all_credit_fund_records: CreditFundRecordGETModel[] = [];
  messages: { message: string, type: string }[] = [];
  filters: CreditFundRecordListFilter = {
    added: '',
    amount: '',
    fund_source: '',
    max_amount: '',
    min_amount: '',
    ordering: '',
    search: ''
  };

  constructor(private _fundService: FundService, private _router: Router) { }

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
    ordering: '',
    search: ''
  }) {
    this.loading = true;
    this._fundService.get_all_funds(filters)
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
    this.filters = filters;
    return this.ngOnInit(this.filters); // Todo: Check if filtering has errors,
  }

  onReload() {
    return this.ngOnInit(this.filters);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  onAddData(data: CreditFundRecordGETModel) {
    this.all_credit_fund_records.splice(0, 0, data);
  }
}
