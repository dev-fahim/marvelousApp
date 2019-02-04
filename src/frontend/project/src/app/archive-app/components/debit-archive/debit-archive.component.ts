import { ArchiveService } from './../../../service/archive/archive.service';
import { ExpenditureHistoryModel } from './../../../service/models';
import { Component, OnInit } from '@angular/core';
import * as errors from '../../../common';

@Component({
  selector: 'app-debit-archive',
  templateUrl: './debit-archive.component.html',
  styleUrls: ['./debit-archive.component.scss']
})
export class DebitArchiveComponent implements OnInit {

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

  constructor(private _archiveService: ArchiveService) { }

  ngOnInit() {
    this.get_refundable()
  }

  get_refundable() {
    this._archiveService.get_all_expenditures_archive(this.search)
      .subscribe(
        (response) => {
          this.refundable = true;
          let data = [];
          for (const expend of response) {
            if (expend.is_for_refund === true) {data.push(expend)}
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
    this._archiveService.get_all_expenditures_archive(this.search)
    .subscribe(
      (response) => {
        this.refundable = false;
        let data = [];
        for (const expend of response) {
          if (expend.is_for_refund === false) {data.push(expend)}
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
