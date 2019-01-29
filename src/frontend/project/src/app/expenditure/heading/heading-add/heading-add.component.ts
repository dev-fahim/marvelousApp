import { ServerError } from 'src/app/common/serve-error';
import { AppError } from './../../../common/app-error';
import { Router } from '@angular/router';
import { UnAuthorized } from './../../../common/unauthorized-error';
import { Forbidden } from './../../../common/forbidden';
import { BadInput } from './../../../common/bad-input';
import { HeadingService } from './../../../service/expenditure/heading.service';
import { ExpenditureHeadingGETModel } from './../../../service/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
    ])
  });

  constructor(private _headingService: HeadingService, private _router: Router) { }

  throw_error(error: AppError) {
    if (error instanceof BadInput) {
      return this.messages.splice(0, 0, { message: 'You have entered invalid data or fund is limited. All fields and required and must be valid.', type: 'error' });
    }
    if (error instanceof Forbidden) {
      return this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
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
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._headingService.add_heading(this.form.value)
        .subscribe(
          (next: ExpenditureHeadingGETModel) => {
            this.heading_data.emit(this.form.value);
            this.loading = false;
            this.form.reset;
            this.messages.splice(0, 0, { message: 'Debit Heading ADDED successfuly.', type: 'positive' });
          },
          (error: AppError) => {
            return this.throw_error(error);
          }
        )
    }
  }

  onReset() {
    this.messages = [];
    this.form.reset();
  }

}
