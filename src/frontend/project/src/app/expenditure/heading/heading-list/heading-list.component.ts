import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HeadingService } from 'src/app/service/expenditure/heading.service';
import { ExpenditureHeadingGETModel } from './../../../service/models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as errors from '../../../common';

@Component({
  selector: 'app-heading-list',
  templateUrl: './heading-list.component.html',
  styleUrls: ['./heading-list.component.scss']
})
export class HeadingListComponent implements OnInit {
  loading = true;
  all_headings: ExpenditureHeadingGETModel[];
  heading_data: ExpenditureHeadingGETModel = {
    id: 0,
    heading_name: '',
    description: '',
    updated: '',
    uuid: '',
    url: '',
    added: '',
    is_deleted: false
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

  ngOnInit() {
    this._headingService.get_all_headings()
      .subscribe(
        (next) => {
          let data = [];
          for (const heading of next) {
            if (heading.is_deleted === false) { data.push(heading) }
          }
          return this.all_headings = data;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
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
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        })
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
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
  }

}
