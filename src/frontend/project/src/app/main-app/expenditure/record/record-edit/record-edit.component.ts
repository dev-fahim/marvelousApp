import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService, SpecificExpenditureRecordModel } from 'src/app/service/expenditure/record.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FundService } from 'src/app/service/credit/fund.service';
import { HeadingService } from 'src/app/service/expenditure/heading.service';

@Component({
  selector: 'app-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {
  expenditure_data: SpecificExpenditureRecordModel = {
    expend_by: '',
    description: '',
    amount: 0,
    expend_date: '',
    expend_heading: '',
    is_verified: false
  };
  HTTP_404_ERROR = false;
  FUND_LOCKED_ERROR = false;
  uuid = '';
  added = false;
  deleted = false;
  has_error = false;
  messege = '';

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
  has_form_error = false;
  fund_status = [{
    url: 'Nothing',
    is_not_locked: true
  }];

  constructor(
    private _acRoute: ActivatedRoute,
    public recordService: RecordService,
    public fundService: FundService,
    public headingService: HeadingService
  ) { }

  ngOnInit() {
    this._acRoute.paramMap.subscribe(
      (params) => {
        return this.uuid = params.get('uuid');
      }
    )
    this.recordService.get_specific_record(this.uuid)
      .subscribe(
        (result) => {
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
        (errors: Response) => {
          if (errors.status === 404) {
            this.HTTP_404_ERROR = true;
          }
        }
      );
    this.fundService.get_fund_status()
      .subscribe(
        (result) => {
          return this.FUND_LOCKED_ERROR = !result.is_not_locked
        }
      )
    this.headingService.get_all_headings()
      .subscribe(
        (result) => {
          for (let heading of result) {
            this.all_headings.push({heading: heading.heading_name, id: heading.id})
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
    return this.recordService.update_record(this.form.value, this.uuid)
      .subscribe(
        (result) => {
          this.added = true;
          console.log(result)
        },
        (error: Response) => {
          if (error.status === 400) {
            this.has_error = true;
            this.messege = 'Some error occured or credit fund is limited.'
          }
          if (error.status === 403) {
            this.has_error = true;
            this.messege = 'Permission denied. Either you have no permission or credit fund is now locked.'
          }
        }
      )
  }

  onDelete() {
    return this.recordService.delete_record(this.uuid)
      .subscribe(
        (result) => {
          return this.deleted = true;
        },
        (error) => {
          if (error.status === 403) {
            this.has_error = true;
            this.messege = 'Permission denied. Either you have no permission or credit fund is now locked.'
          }
        }
      )
  }

  get get_success() {
    return this.added;
  }

  get get_deleted() {
    return this.deleted;
  }

  get get_error() {
    return { messege: this.messege, has_error: this.has_error }
  }

}
