import { FormControl, Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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
        (error) => {
          if (error instanceof UnAuthorized) {
            this._router.navigate(['/login']);
          }
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
        }
      )
  }

}
