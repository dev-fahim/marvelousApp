import { SourceService } from './../../../service/credit/source.service';
import { Router } from '@angular/router';
import { CreditFundSourceFilterModel, CreditFundSourceGETModel } from './../../../service/models';
import { Component, OnInit } from '@angular/core';
import * as errors from '../../../common';

@Component({
  selector: 'app-fund-source-list',
  templateUrl: './fund-source-list.component.html',
  styleUrls: ['./fund-source-list.component.scss']
})
export class FundSourceListComponent implements OnInit {

  loading = false;
  credit_fund_source_data: CreditFundSourceGETModel = {
    source_name: '',
    description: '',
    id: 0,
    updated: '',
    uuid: '',
    url: '',
    added: '',
    is_deleted: false
  }
  all_credit_fund_sources: CreditFundSourceGETModel[] = [];
  messages: { message: string, type: string }[] = [];
  filters: CreditFundSourceFilterModel = {
    ordering: '',
    search: ''
  };

  constructor(private _sourceService: SourceService, private _router: Router) { }

  ngOnInit(filters: CreditFundSourceFilterModel = this.filters) {
    this.loading = true;
    this._sourceService.get_all_sources(filters)
      .subscribe(
        (next) => {
          this.loading = false;
          let values = []
          for (let data of next) {
            if (data.is_deleted === false) {
              values.push(data);
            }
          }
          return this.all_credit_fund_sources = values;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
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
