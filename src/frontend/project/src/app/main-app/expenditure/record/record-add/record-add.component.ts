import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeadingService } from './../../../../service/expenditure/heading.service';
import { RecordService } from 'src/app/service/expenditure/record.service';
import { FundService } from 'src/app/service/credit/fund.service';

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
  all_headings;
  has_form_error = false;
  fund_status = {
    is_not_locked: true
  };
  message = '';

  constructor(
    public headingService: HeadingService, 
    public recordService: RecordService,
    public fundService: FundService
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
    return this.recordService.add_record(this.form.value)
      .subscribe(
        (result) => {
          this.has_form_error = false;
          this.expenditure_added.emit(this.form.value)
          return this.form.reset();
        },
        (error: Response) => {
          if (error.status === 400) {
            this.message = 'Values are invalid.'
            return this.has_form_error = true;
          }
        }
      )
  }

  public onResets() {
    this.has_form_error = false;
    return this.form.reset;
  }

  get get_form_error() {
    return this.has_form_error;
  }

  get fund_not_locked() {
    return this.fund_status.is_not_locked
  }
}
