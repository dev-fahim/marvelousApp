import { LoanService } from 'src/app/service/loan/loan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FundService } from 'src/app/service/credit/fund.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditFundSourceGETModel, CreditFundRecordPUTModel, LoanCreditGETModel } from './../../../service/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SourceService } from 'src/app/service/credit/source.service';
import * as errors from '../../../common';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.scss']
})
export class CreditEditComponent implements OnInit, OnDestroy {
  loading = false;
  loading_del = false;
  fund_is_locked = false;
  record_data: LoanCreditGETModel;
  extra_description: string = '';
  is_active = false;
  is_active_update = false;

  uuid: string;
  messages: { message: string, type: string }[] = [];

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
    ]),
    extra_description: new FormControl(this.extra_description, [
      Validators.required
    ]),
    is_deleted: new FormControl(false)
  });

  all_sources: CreditFundSourceGETModel[] = [];

  constructor(
    private _fundService: FundService,
    private _router: Router,
    private _acRoute: ActivatedRoute,
    private _sourceService: SourceService,
    private _loanService: LoanService
  ) {
  }

  toggle_modal() {
    this.is_active = !this.is_active;
  }

  toggle_modal_update() {
    this.is_active_update = !this.is_active_update
  }

  ngOnInit() {
    this._sourceService.get_all_sources({ ordering: '', search: '' })
      .subscribe(
        (next) => {
          this.all_sources = next;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
    this._acRoute.paramMap.subscribe(
      (paramMap) => {
        this.uuid = paramMap.get('uuid')
      }
      ,
      (error: errors.AppError) => {
        this.loading = false;
        const main_error = errors.throw_http_response_error(error);
        return this.messages.push({message: main_error.detail, type: main_error.type})
      })
    this._loanService.get_specific_fund_record(this.uuid).subscribe(
      (next: LoanCreditGETModel) => {
        this.loading = false;
        this.record_data = next;
        this.form.setValue({
          source: next.source,
          description: next.description,
          amount: next.amount,
          fund_added: next.fund_added,
          extra_description: this.extra_description,
          is_deleted: false
        })
      })
    this._fundService.get_fund_status()
      .subscribe(
        (next) => {
          this.fund_is_locked = !next
        },(error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.loading = true;
      this._loanService.update_funds(this.form.value, this.uuid)
        .subscribe(
          (next: CreditFundRecordPUTModel) => {
            this.loading = false;
            this.messages.splice(0, 0, { message: 'Credit fund record has been UPDATED successfuly.', type: 'positive' });
          },
          (error: errors.AppError) => {
            this.loading = false;
            const main_error = errors.throw_http_response_error(error);
            return this.messages.push({message: main_error.detail, type: main_error.type})
          }
        )
    }
  }

  onDelete() {
    if (this.form.valid) {
      this.loading_del = true;
      this.form.get('is_deleted').setValue(true);
      this._loanService.update_funds(this.form.value, this.uuid)
        .subscribe((next: CreditFundRecordPUTModel) => {
          this.loading_del = false;
          this._router.navigate(['/main-app/credit/fund/record/list-add'])
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
  }

  get fund_locked() {
    return this.fund_is_locked;
  }

  get_record_data() {
    return this.record_data.source_name;
  }

  ngOnDestroy() {
    this.extra_description = '';
    this.form.reset();
  }
}
