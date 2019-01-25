import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeadingService } from './../../../service/expenditure/heading.service';
import { RecordService } from 'src/app/service/expenditure/record.service';
import { FundService } from 'src/app/service/credit/fund.service';
import { BadInput } from 'src/app/common/bad-input';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { Router } from '@angular/router';
import { AppError } from 'src/app/common/app-error';
import { Forbidden } from 'src/app/common/forbidden';
import { ServerError } from 'src/app/common/serve-error';
import { ExpenditureHeadingGETModel } from 'src/app/service/models';

@Component({
  selector: 'app-record-add',
  templateUrl: './record-add.component.html',
  styleUrls: ['./record-add.component.scss']
})
export class RecordAddComponent implements OnInit {
  @Output() expenditure_added = new EventEmitter()
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
    ])
  })
  all_headings: ExpenditureHeadingGETModel[];
  fund_status = false;;
  messages: { message: string, type: string }[] = [];
  loading = false;

  constructor(
    public headingService: HeadingService,
    public recordService: RecordService,
    public fundService: FundService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.headingService.get_all_headings()
      .subscribe(
        (result) => {
          return this.all_headings = result;
        }
      )
    this.fundService.get_fund_status()
      .subscribe(
        (result) => {
          return this.fund_status = result;
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

  onSubmit() {
    this.loading = true;
    this.recordService.add_record(this.form.value)
      .subscribe(
        (next) => {
          this.expenditure_added.emit(this.form.value)
          this.form.reset();
          this.loading = false;
          this.messages.splice(0, 0, { message: 'Expenditure record ADDED successfuly.', type: 'positive' });
        },
        (error: AppError) => {
          this.loading = false;
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

  get fund_not_locked() {
    return this.fund_status;
  }

  onReset() {
    this.messages = [];
    this.form.reset();
  }
}
