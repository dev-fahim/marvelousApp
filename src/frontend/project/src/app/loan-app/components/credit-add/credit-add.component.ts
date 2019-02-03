import { FundService } from 'src/app/service/credit/fund.service';
import { LoanService } from 'src/app/service/loan/loan.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as models from '../../../service/models';
import * as errors from '../../../common';
import { SourceService } from 'src/app/service/credit/source.service';

@Component({
  selector: 'app-credit-add',
  templateUrl: './credit-add.component.html',
  styleUrls: ['./credit-add.component.scss']
})
export class CreditAddComponent implements OnInit {

  @Output() record_data = new EventEmitter<models.LoanCreditGETModel>();

  messages: { message: string, type: string }[] = [];
  loading = false;
  fund_is_locked = false;

  form = new FormGroup({
    source: new FormControl(0, [
      Validators.required,
      Validators.minLength(1)
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    amount: new FormControl("", [
      Validators.required
    ]),
    fund_added: new FormControl("", [
      Validators.required
    ]),
    extra_description: new FormControl(""),
    is_deleted: new FormControl(false)
  });

  all_sources: models.CreditFundSourceGETModel[] = [];

  constructor(
    private _loanService: LoanService,
    private _sourceService: SourceService,
    private _fundService: FundService
  ) { }

  ngOnInit() {
    this._sourceService.get_all_sources({ordering: '', search: ''})
      .subscribe(
        (next) => {
          let data = []
          for (const source of next) {
            if (source.is_deleted === false) {data.push(source)}
          }
          return this.all_sources = data;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
    this._fundService.get_fund_status()
      .subscribe(
        (next) => {
          this.fund_is_locked = !next
        }
      )
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._loanService.add_funds(this.form.value)
        .subscribe(
          (next: models.LoanCreditPOSTModel) => {
            this.record_data.emit(this.form.value);
            this.loading = false;
            this.form.reset;
            this.messages.splice(0, 0, { message: 'Credit fund record ADDED successfuly.', type: 'positive' });
          },
          (error: errors.AppError) => {
            this.loading = false;
            const main_error = errors.throw_http_response_error(error);
            return this.messages.push({message: main_error.detail, type: main_error.type})
          }
        )
    }
  }

  onReset() {
    this.messages = [];
    this.form.reset();
  }

  get fund_locked() {
    return this.fund_is_locked;
  }
}
