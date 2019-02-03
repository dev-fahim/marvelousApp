import { CreditFundSourcePOSTModel } from './../../../service/models';
import { FundService } from 'src/app/service/credit/fund.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditFundSourceGETModel } from 'src/app/service/models';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SourceService } from 'src/app/service/credit/source.service';
import * as errors from '../../../common';

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
    ]),
    extra_description: new FormControl(""),
    is_deleted: new FormControl(false)
  });

  constructor(
    private _router: Router,
    private _sourceService: SourceService,
    private _fundService: FundService
  ) { }

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
          (next: CreditFundSourcePOSTModel) => {
            this.record_data.emit(this.form.value);
            this.loading = false;
            this.form.reset;
            this.messages.splice(0, 0, { message: 'Credit fund source ADDED successfuly.', type: 'positive' });
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
    this.form.reset();
  }

  get fund_locked() {
    return this.fund_is_locked;
  }

}
