import { ExpenditureRecordGETModel } from './../../../service/models';
import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from './../../../common/unauthorized-error';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService, SpecificExpenditureRecordModel } from '../../../service/expenditure/record.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FundService } from '../../../service/credit/fund.service';
import { HeadingService } from '../../../service/expenditure/heading.service';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { Forbidden } from 'src/app/common/forbidden';
import { NotFound } from 'src/app/common/not-found';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {
  expenditure_data: ExpenditureRecordGETModel;

  FUND_LOCKED = false;
  uuid = '';

  form = new FormGroup({
    expend_by: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
    amount: new FormControl('', [
      Validators.required
    ]),
    expend_date: new FormControl('', [
      Validators.required
    ]),
    expend_heading: new FormControl('', [
      Validators.required
    ]),
    is_verified: new FormControl('', [
      Validators.required
    ])
  })

  all_headings = [];
  messages: { message: string, type: string }[] = [];
  loading_del = false;
  loading = false;

  constructor(
    private _acRoute: ActivatedRoute,
    public recordService: RecordService,
    public fundService: FundService,
    public headingService: HeadingService,
    private _router: Router
  ) { }

  throw_error(error: AppError) {
    if (error instanceof BadInput) {
      return this.messages.splice(0, 0, { message: 'Invalid UUID or fund is limited.', type: 'error' });
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
    return this.messages.splice(0, 0, { message: 'An unexpected error ocurred.', type: 'error' });
  }

  ngOnInit() {
    this.loading = true;
    this._acRoute.paramMap.subscribe(
      (params) => {
        return this.uuid = params.get('uuid');
      }
    )
    this.recordService.get_specific_record(this.uuid)
      .subscribe(
        (result) => {
          this.loading = false;
          this.expenditure_data = result;
          this.form.setValue({
            expend_by: this.expenditure_data.expend_by,
            description: this.expenditure_data.description,
            amount: this.expenditure_data.amount,
            expend_date: this.expenditure_data.expend_date,
            expend_heading: this.expenditure_data.expend_heading,
            is_verified: this.expenditure_data.is_verified
          })
        },
        (error: AppError) => {
          this.loading = false;
          return this.throw_error(error)
        }
      );
    this.fundService.get_fund_status()
      .subscribe(
        (result) => {
          this.loading = false;
          return this.FUND_LOCKED = !result
        }
      )
    this.headingService.get_all_headings()
      .subscribe(
        (result) => {
          this.loading = false;
          for (let heading of result) {
            this.all_headings.push({ heading: heading.heading_name, id: heading.id })
          }
        }
      )
  }

  get expend_by() {
    return this.form.get('expend_by')
  }
  get description() {
    return this.form.get('description')
  }
  get amount() {
    return this.form.get('amount')
  }
  get expend_date() {
    return this.form.get('expend_date')
  }
  get expend_heading() {
    return this.form.get('expend_heading')
  }
  get is_verified() {
    return this.form.get('is_verified')
  }

  onSubmit() {
    this.loading = true;
    console.log(this.form.value)
    return this.recordService.update_record(this.form.value, this.uuid)
      .subscribe(
        (result) => {
          this.loading = false;
          this.messages.splice(0, 0, { message: 'Expenditure record has been UPDATED successfuly.', type: 'positive' });
        },
        (error: AppError) => {
          this.loading = false;
          return this.throw_error(error);
        }
      )
  }

  onDelete() {
    this.loading_del = true;
    this.recordService.delete_record(this.uuid)
      .subscribe(
        (result) => {
          this.loading_del = false;
          this.messages.splice(0, 0, { message: 'Expenditure record has been DELETED successfuly.', type: 'positive' });
        },
        (error: AppError) => {
          this.loading_del = false;
          return this.throw_error(error);
        }
      )
  }

  get fund_not_locked() {
    return !this.FUND_LOCKED
  }

  onReset() {
    this.messages = [];
  }

}
