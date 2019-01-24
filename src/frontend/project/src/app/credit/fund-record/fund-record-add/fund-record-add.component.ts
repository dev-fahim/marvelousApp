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

@Component({
  selector: 'app-fund-record-add',
  templateUrl: './fund-record-add.component.html',
  styleUrls: ['./fund-record-add.component.scss']
})
export class FundRecordAddComponent implements OnInit {

  @Output() record_data = new EventEmitter<CreditFundRecordGETModel>();

  messages: { message: string, type: string }[] = [];
  loading = false;

  form = new FormGroup({
    source: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
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
    ])
  });

  constructor(private _fundService: FundService, private _router: Router) { }

  ngOnInit() {
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
            if (error instanceof BadInput) {
              this.messages.splice(0, 0, { message: 'You have entered invalid data or fund is limited. All fields and required and must be valid.', type: 'error' });
            }
            if (error instanceof Forbidden) {
              this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
            }
            if (error instanceof UnAuthorized) {
              this._router.navigate(['/login'])
              this.messages.splice(0, 0, { message: 'You are not logged in.', type: 'error' });
            }
            if (error instanceof ServerError) {
              this.messages.splice(0, 0, { message: 'Internal Server Error.', type: 'error' });
            }
          }
        )
    }
  }

  onReset() {
    this.messages = [];
    this.form.reset();
  }

}
