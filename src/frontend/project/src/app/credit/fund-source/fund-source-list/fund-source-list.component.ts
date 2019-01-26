import { ServerError } from './../../../common/serve-error';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { NotFound } from 'src/app/common/not-found';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from './../../../common/bad-input';
import { AppError } from './../../../common/app-error';
import { SourceService } from './../../../service/credit/source.service';
import { Router } from '@angular/router';
import { CreditFundSourceFilterModel, CreditFundSourceGETModel } from './../../../service/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-source-list',
  templateUrl: './fund-source-list.component.html',
  styleUrls: ['./fund-source-list.component.scss']
})
export class FundSourceListComponent implements OnInit {

  loading = false;
  credit_fund_source_data: CreditFundSourceGETModel = {
    source_name: '',
    description: ''
  }
  all_credit_fund_sources: CreditFundSourceGETModel[] = [];
  messages: { message: string, type: string }[] = [];
  filters: CreditFundSourceFilterModel = {
    ordering: '',
    search: ''
  };

  constructor(private _sourceService: SourceService, private _router: Router) { }

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

  ngOnInit(filters: CreditFundSourceFilterModel = this.filters) {
    this.loading = true;
    this._sourceService.get_all_sources(filters)
      .subscribe(
        (next) => {
          this.loading = false;
          this.all_credit_fund_sources = next;
        },
        (error: AppError) => {
          this.loading = false;
          return this.throw_error(error);
        }
      )
  }

  onFilterData(filters: CreditFundSourceFilterModel) {
    this.filters = filters;
    return this.ngOnInit(this.filters); // Todo: Check if filtering has errors,
  }

  onReload() {
    return this.ngOnInit(this.filters);
  }

  onAddData(data: CreditFundSourceGETModel) {
    this.all_credit_fund_sources.splice(0, 0, data);
  }

  set_source_data(data: CreditFundSourceGETModel) {
    return this.credit_fund_source_data = data;
  }
}
