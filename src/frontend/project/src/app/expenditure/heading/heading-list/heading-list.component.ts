import { ServerError } from './../../../common/serve-error';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from './../../../common/bad-input';
import { Forbidden } from 'src/app/common/forbidden';
import { NotFound } from './../../../common/not-found';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HeadingService } from 'src/app/service/expenditure/heading.service';
import { ExpenditureHeadingGETModel } from './../../../service/models';
import { Component, OnInit } from '@angular/core';
import { UnAuthorized } from 'src/app/common/unauthorized-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading-list',
  templateUrl: './heading-list.component.html',
  styleUrls: ['./heading-list.component.scss']
})
export class HeadingListComponent implements OnInit {
  all_headings: ExpenditureHeadingGETModel[];
  heading_data: ExpenditureHeadingGETModel = {
    heading_name: '',
    description: ''
  };
  messages: { message: string, type: string }[];
  uuid: string;

  form = new FormGroup({
    heading_name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(private _headingService: HeadingService, private _router: Router) { }

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
    this._headingService.get_all_headings()
      .subscribe(
        (next) => {
          this.all_headings = next;
        }
      )
  }

  onAddHeading(heading_data: ExpenditureHeadingGETModel) {
    this.all_headings.splice(0, 0, heading_data);
  }

  onSearch(search_data = '') {
    this._headingService.get_all_headings(search_data)
      .subscribe(
        (next) => {
          this.all_headings = next;
        },
        (error: AppError) => {
          return this.throw_error(error);
        }
      )
  }

  set_heading_data(data: ExpenditureHeadingGETModel) {
    return this.heading_data = data;
  }

  onRedo() {
    this._headingService.get_all_headings()
      .subscribe(
        (next) => {
          this.all_headings = next;
        },
        (error: AppError) => {
          return this.throw_error(error);
        }
      )
  }

}
