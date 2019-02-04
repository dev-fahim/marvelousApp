import { ExpenditureHistoryModel } from './../../../service/models';
import { BackAppService } from './../../../service/back-app/back-app.service';
import { Component, OnInit } from '@angular/core';
import * as errors from '../../../common';

@Component({
  selector: 'app-history-expend',
  templateUrl: './history-expend.component.html',
  styleUrls: ['./history-expend.component.scss']
})
export class HistoryExpendComponent implements OnInit {

  all_expends: ExpenditureHistoryModel[] = [];
  refundable = false;
  table_columns = [
    "action by",
    "action date",
    "record added",
    "old debit head",
    "new debit head",
    "old description",
    "new description",
    "old amount",
    "new amount",
    "message"
  ]

  search = "";

  constructor(private _backAppService: BackAppService) { }

  ngOnInit() {
    this.get_refundable()
  }

  get_refundable() {
    this._backAppService.get_all_expenditures_history(this.search)
      .subscribe(
        (response) => {
          this.refundable = true;
          let data = [];
          for (const expend of response) {
            if (expend.is_for_refund === true) { data.push(expend) }
          }
          return this.all_expends = data;
        },
        (error: errors.AppError) => {
          const main_error = errors.throw_http_response_error(error);
          console.log(main_error.detail)
        }
      )
  }

  get_non_refundable() {
    this._backAppService.get_all_expenditures_history(this.search)
      .subscribe(
        (response) => {
          this.refundable = false;
          let data = [];
          for (const expend of response) {
            if (expend.is_for_refund === false) { data.push(expend) }
          }
          return this.all_expends = data;
        },
        (error: errors.AppError) => {
          const main_error = errors.throw_http_response_error(error);
          console.log(main_error.detail)
        }
      )
  }

}
