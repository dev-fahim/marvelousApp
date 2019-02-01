import { Observable } from 'rxjs';
import { ServerError } from 'src/app/common/serve-error';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { NotFound } from 'src/app/common/not-found';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from './../../../common/bad-input';
import { Router, ActivatedRoute } from '@angular/router';
import { FundService } from 'src/app/service/credit/fund.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditFundRecordGETModel, CreditFundSourceGETModel } from './../../../service/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { SourceService } from 'src/app/service/credit/source.service';

@Component({
  selector: 'app-fund-record-edit',
  templateUrl: './fund-record-edit.component.html',
  styleUrls: ['./fund-record-edit.component.scss']
})
export class FundRecordEditComponent implements OnInit, OnDestroy {
  loading = false;
  loading_del = false;
  fund_is_locked = false;
  record_data: CreditFundRecordGETModel;
  extra_description: string = '';

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
      
    ]),
    is_deleted: new FormControl(false)
  });

  all_sources: CreditFundSourceGETModel[] = [{ source_name: '', description: '', extra_description: '' }];

  constructor(
    private _fundService: FundService,
    private _router: Router,
    private _acRoute: ActivatedRoute,
    private _sourceService: SourceService
  ) {
  }

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
    this._sourceService.get_all_sources({ ordering: '', search: '' })
      .subscribe(
        (next) => {
          this.all_sources = next;
        },
        (error: AppError) => {
          this.loading = false;
          this.throw_error(error);
        }
      )
    this._acRoute.paramMap.subscribe(
      (paramMap) => {
        this.uuid = paramMap.get('uuid')
      }
      ,
      (error: AppError) => {
        this.loading = false;
        return this.throw_error(error);
      })
    this._fundService.get_specific_fund_record(this.uuid).subscribe(
      (next: CreditFundRecordGETModel) => {
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
        }
      )
  }

  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.loading = true;
      this._fundService.update_funds(this.form.value, this.uuid)
        .subscribe(
          (next: CreditFundRecordGETModel) => {
            this.loading = false;
            this.messages.splice(0, 0, { message: 'Credit fund record has been UPDATED successfuly.', type: 'positive' });
          },
          (error: AppError) => {
            this.loading = false;
            return this.throw_error(error);
          }
        )
    }
  }

  onDelete() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.loading_del = true;
      this.form.get('is_deleted').setValue(true);
      this._fundService.update_funds(this.form.value, this.uuid)
        .subscribe((next: CreditFundRecordGETModel) => {
          this.loading_del = false;
          this.messages.splice(0, 0, { message: 'Credit fund record has been DELETED successfuly.', type: 'positive' });
          this._router.navigate(['/main-app/credit/fund/record/list-add'])
        },
          (error: AppError) => {
            this.loading_del = false;
            return this.throw_error(error);
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
