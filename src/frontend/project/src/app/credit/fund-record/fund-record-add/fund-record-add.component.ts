import { FundStatus } from './../../../service/credit/fund.service';
import { CreditFundSourceGETModel } from './../../../service/models';
import { NotFound } from './../../../common/not-found';
import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from './../../../common/unauthorized-error';
import { Forbidden } from 'src/app/common/forbidden';
import { BadInput } from 'src/app/common/bad-input';
import { AppError } from './../../../common/app-error';
import { FundService } from 'src/app/service/credit/fund.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CreditFundRecordGETModel } from 'src/app/service/models';
import { SourceService } from 'src/app/service/credit/source.service';

@Component({
  selector: 'app-fund-record-add',
  templateUrl: './fund-record-add.component.html',
  styleUrls: ['./fund-record-add.component.scss']
})
export class FundRecordAddComponent implements OnInit {

  @Output() record_data = new EventEmitter<CreditFundRecordGETModel>();

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

  all_sources: CreditFundSourceGETModel[] = [];

  constructor(
    private _fundService: FundService,
    private _router: Router,
    private _sourceService: SourceService
  ) { }

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

  ngOnInit() {
    this._sourceService.get_all_sources({ordering: '', search: ''})
      .subscribe(
        (next) => {
          this.all_sources = next;
        },
        (error: AppError) => {
          this.loading = false;
          this.throw_error(error);
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
      this._fundService.add_funds(this.form.value)
        .subscribe(
          (next: CreditFundRecordGETModel) => {
            this.record_data.emit(this.form.value);
            this.loading = false;
            this.form.reset;
            this.messages.splice(0, 0, { message: 'Credit fund record ADDED successfuly.', type: 'positive' });
          },
          (error: AppError) => {
            this.throw_error(error)
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
