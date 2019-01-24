import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { NotFound } from 'src/app/common/not-found';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from './../../../common/bad-input';
import { Router } from '@angular/router';
import { FundService } from 'src/app/service/credit/fund.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditFundRecordGETModel } from './../../../service/models';
import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppError } from 'src/app/common/app-error';

@Component({
  selector: 'app-fund-record-edit',
  templateUrl: './fund-record-edit.component.html',
  styleUrls: ['./fund-record-edit.component.scss']
})
export class FundRecordEditComponent implements OnInit {
  loading = false;
  loading_del = false;
  private _data = new BehaviorSubject<CreditFundRecordGETModel>({
    source: 0,
    description: '',
    amount: 0,
    fund_added: ''
  });

  @Input()
  set fund_record(value: CreditFundRecordGETModel) {
    this._data.next(value);
  };

  get fund_record() {
    return this._data.getValue();
  }

  messages: { message: string, type: string }[] = [];
  uuid: string;

  form = new FormGroup({
    source: new FormControl(0, [
      Validators.required
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    amount: new FormControl(0, [
      Validators.required
    ]),
    fund_added: new FormControl("", [
      Validators.required
    ])
  });

  constructor(private _fundService: FundService, private _router: Router) { }

  ngOnInit() {
    this._data.subscribe(
      x => {
        this.uuid = this.fund_record.uuid;
        this.form.setValue({
          source: this.fund_record.source,
          description: this.fund_record.description,
          amount: this.fund_record.amount,
          fund_added: this.fund_record.fund_added
        })
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._fundService.update_funds(this.form.value, this.uuid)
        .subscribe(
          (next: CreditFundRecordGETModel) => {
            this.loading = false;
            console.log('Updated')
            this.messages.splice(0, 0, { message: 'Credit fund record has been UPDATED successfuly.', type: 'positive' });
          },
          (error: AppError) => {
            this.loading = false;
            if (error instanceof BadInput) {
              this.messages.splice(0, 0, { message: 'You have entered invalid data or fund is limited. All fields and required and must be valid.', type: 'error' });
            }
            if (error instanceof Forbidden) {
              this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
            }
            if (error instanceof NotFound) {
              this.messages.splice(0, 0, { message: '404 Not Found', type: 'error' });
            }
            if (error instanceof UnAuthorized) {
              this._router.navigate(['/login'])
              this.messages.splice(0, 0, { message: 'You are not logged in.', type: 'error' });
            }
            if (error instanceof ServerError) {
              this._router.navigate(['/login'])
              this.messages.splice(0, 0, { message: 'Internal Server Error.', type: 'error' });
            }
          }
        )
    }
  }

  onDelete() {
    if (this.form.valid) {
      this.loading_del = true;
      this._fundService.delete_funds(this.uuid)
        .subscribe((next: CreditFundRecordGETModel) => {
          this.loading_del = false;
          this.messages.splice(0, 0, { message: 'Credit fund record has been DELETED successfuly.', type: 'positive' });
        },
          (error: AppError) => {
            this.loading_del = false;
            if (error instanceof BadInput) {
              this.messages.splice(0, 0, { message: 'Invalid UUID or fund is limited.', type: 'error' });
            }
            if (error instanceof Forbidden) {
              this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
            }
            if (error instanceof NotFound) {
              this.messages.splice(0, 0, { message: '404 Not Found', type: 'error' });
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._data.unsubscribe();
  }

  onReset() {
    this.messages = [];
  }
}
