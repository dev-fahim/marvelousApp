import { Router } from '@angular/router';
import { HeadingService } from './../../../service/expenditure/heading.service';
import { ExpenditureHeadingGETModel, ExpenditureHeadingPOSTModel } from './../../../service/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as errors from '../../../common';

@Component({
  selector: 'app-heading-add',
  templateUrl: './heading-add.component.html',
  styleUrls: ['./heading-add.component.scss']
})
export class HeadingAddComponent implements OnInit {

  @Output() heading_data = new EventEmitter<ExpenditureHeadingGETModel>();

  messages: { message: string, type: string }[] = [];
  loading = false;

  form = new FormGroup({
    heading_name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    extra_description: new FormControl("")
  });

  constructor(private _headingService: HeadingService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._headingService.add_heading(this.form.value)
        .subscribe(
          (next: ExpenditureHeadingPOSTModel) => {
            this.heading_data.emit(this.form.value);
            this.loading = false;
            this.form.reset;
            this.messages.splice(0, 0, { message: 'Debit Heading ADDED successfuly.', type: 'positive' });
          },
          (error: errors.AppError) => {
            this.loading = false;
            const main_error = errors.throw_http_response_error(error);
            return this.messages.push({ message: main_error.detail, type: main_error.type })
          }
        )
    }
  }

  onReset() {
    this.messages = [];
    this.form.reset();
  }

}
