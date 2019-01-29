import { FundService } from 'src/app/service/credit/fund.service';
import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { NotFound } from 'src/app/common/not-found';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from 'src/app/common/bad-input';
import { AppError } from 'src/app/common/app-error';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditFundSourceGETModel } from 'src/app/service/models';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SourceService } from 'src/app/service/credit/source.service';

@Component({
  selector: 'app-fund-source-add',
  templateUrl: './fund-source-add.component.html',
  styleUrls: ['./fund-source-add.component.scss']
})
export class FundSourceAddComponent implements OnInit {

  @Output() record_data = new EventEmitter<CreditFundSourceGETModel>();

  messages: { message: string, type: string }[] = [];
  loading = false;
  fund_is_locked = false;

  form = new FormGroup({
    source_name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ])
  });

  constructor(
    private _router: Router,
    private _sourceService: SourceService,
    private _fundService: FundService
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
      this._sourceService.add_sources(this.form.value)
        .subscribe(
          (next: CreditFundSourceGETModel) => {
            this.record_data.emit(this.form.value);
            this.loading = false;
            this.form.reset;
            this.messages.splice(0, 0, { message: 'Credit fund source ADDED successfuly.', type: 'positive' });
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
