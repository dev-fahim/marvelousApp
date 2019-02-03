import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordService } from '../../../service/expenditure/record.service';
import { ActivatedRoute } from '@angular/router';
import * as errors from '../../../common';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit, OnDestroy {
  // Todo: Create filter form
  all_expenditures: any[] = [];
  loading = true;
  is_verified = '';
  amount = '';
  max_amount = '';
  min_amount = '';
  added_after = '';
  added_before = '';
  expend_date_after = '';
  expend_date_before = '';
  added_date = '';
  heading = ''
  search = ''
  ordering = ''
  messages: { message: string, type: string }[] = [];
  show_modal = false;

  filter_array = [
    'is_verified',
    'amount',
    'max_amount',
    'min_amount',
    'added_after',
    'added_before',
    'expend_date_after',
    'expend_date_before',
    'added_date',
    'heading',
    'search',
    'ordering'
  ]

  constructor(public recordService: RecordService, private _actRoute: ActivatedRoute) { }

  toggle_modal() {
    return this.show_modal = !this.show_modal;
  }

  ngOnInit() {
    this._actRoute.queryParamMap.subscribe(
      (params) => {
        for (let data of this.filter_array) {
          if (params.get(data) == null) {
            this[data] = '';
          } else {
            this[data] = params.get(data);
          }
        }
      }
    );
    this.recordService.get_all_expenditures({
      is_verified: this.is_verified,
      amount: this.amount,
      max_amount: this.max_amount,
      min_amount: this.min_amount,
      added_after: this.added_after,
      added_before: this.added_before,
      expend_date_after: this.expend_date_after,
      expend_date_before: this.expend_date_before,
      added_date: this.added_date,
      heading: this.heading,
      search: this.search,
      ordering: this.ordering
    })
      .subscribe(
        (result: any) => {
          this.loading = false;
          const data = [];
          for (let expend of result) {
            if (expend.is_deleted === false && expend.is_for_refund === false) {
              data.push(expend);
            }
          }
          return this.all_expenditures = data;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
  }

  get_expend_length() {
    return this.all_expenditures.length
  }

  is_loading() {
    return this.loading;
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loading = true;
  }

  onFilter(filtered_data = {}) {
    this.recordService.get_all_expenditures(filtered_data)
      .subscribe(
        (result) => {
          this.loading = false;
          const data = [];
          for (let expend of result) {
            if (expend.is_deleted === false && expend.is_for_refund === false) {
              data.push(expend);
            }
          }
          return this.all_expenditures = data;
        },
        (error: errors.AppError) => {
          this.loading = false;
          const main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type})
        }
      )
  }

  onAddExpenditure(expendData = {}) {
    this.all_expenditures.splice(0, 0, expendData)
  }

  onReload() {
    this.ngOnInit();
  }

  get_sum_amount() {
    let amounts = [];
    let un_amounts = [];
    for (let data of this.all_expenditures) {
      if (data.is_verified === true) {amounts.push(data.amount);}
      if (data.is_verified === false) {un_amounts.push(data.amount);}
    }
    let sum = 0;
    let un_sum = 0;

    for (let amount of amounts) {
      sum = sum + amount;
    }
    for (let un_amount of un_amounts) {
      un_sum = un_sum + un_amount;
    }

    return {
      'amount': sum,
      'un_amount': un_sum
    }
  }

}
