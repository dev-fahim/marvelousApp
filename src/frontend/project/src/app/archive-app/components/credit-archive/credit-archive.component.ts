import { CreditHistoryModel } from './../../../service/models';
import { ArchiveService } from './../../../service/archive/archive.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credit-archive',
  templateUrl: './credit-archive.component.html',
  styleUrls: ['./credit-archive.component.scss']
})
export class CreditArchiveComponent implements OnInit {

  all_funds: CreditHistoryModel[] = [];
  refundable = false;
  table_columns = ["action by", "action time", "record added", "old head", "new head", "old amount", "new amount", "message"]

  search = "";

  constructor(private _archiveService: ArchiveService) { }

  ngOnInit() {
    this.get_refundable()
  }

  get_refundable() {
    this._archiveService.get_all_funds_archive(this.search)
      .subscribe(
        (response) => {
          this.refundable = true;
          let data = [];
          for (const funds of response) {
            if (funds.is_refundable === true) {data.push(funds)}
          }
          return this.all_funds = data;
        }
      )
  }

  get_non_refundable() {
    this._archiveService.get_all_funds_archive(this.search)
    .subscribe(
      (response) => {
        this.refundable = false;
        let data = [];
        for (const funds of response) {
          if (funds.is_refundable === false) {data.push(funds)}
        }
        return this.all_funds = data;
      }
    )
  }

}
