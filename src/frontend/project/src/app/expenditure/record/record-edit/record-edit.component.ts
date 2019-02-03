import { ExpenditureRecordGETModel } from './../../../service/models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../../../service/expenditure/record.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FundService } from '../../../service/credit/fund.service';
import { HeadingService } from '../../../service/expenditure/heading.service';
import * as errors from '../../../common';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {
  expenditure_data: ExpenditureRecordGETModel = {
    id: 0,
    edit_url: '',
    details_url: '',
    expend_heading_name: '',
    added_by: '',
    expend_by: '',
    description: '',
    amount: 0,
    is_verified: false,
    expend_date: '',
    uuid: '',
    added: '',
    updated: '',
    is_deleted: false,
    is_for_refund: false,
    expend_heading: 0
  };

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
    ]),
    extra_description: new FormControl("", [
      Validators.required
    ]),
    is_deleted: new FormControl(false)
  })

  all_headings = [];
  messages: { message: string, type: string }[] = [];
  loading_del = false;
  loading = false;
  modal = false;
  modal_update = false;

  constructor(
    private _acRoute: ActivatedRoute,
    public recordService: RecordService,
    public fundService: FundService,
    public headingService: HeadingService,
    private _router: Router
  ) { }

  toggle_modal_update() {
    return this.modal_update = !this.modal_update
  }

  toggle_modal() {
    return this.modal = !this.modal
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
            is_verified: this.expenditure_data.is_verified,
            extra_description: "",
            is_deleted: false
          })
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      );
    this.fundService.get_fund_status()
      .subscribe(
        (result) => {
          this.loading = false;
          return this.FUND_LOCKED = !result
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
    this.headingService.get_all_headings()
      .subscribe(
        (result) => {
          this.loading = false;
          for (let heading of result) {
            this.all_headings.push({ heading: heading.heading_name, id: heading.id })
          }
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
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
    return this.recordService.update_record(this.form.value, this.uuid)
      .subscribe(
        (result) => {
          this.loading = false;
          this.messages.splice(0, 0, { message: 'Expenditure record has been UPDATED successfuly.', type: 'positive' });
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
  }

  onDelete() {
    this.loading_del = true;
    this.form.get('is_deleted').setValue(true);
    this.recordService.delete_record(this.uuid, this.form.value)
      .subscribe(
        (result) => {
          this.loading_del = false;
          this.messages.splice(0, 0, { message: 'Expenditure record has been DELETED successfuly.', type: 'positive' });
          this._router.navigate(['/main-app/expenditure/record'])
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
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
