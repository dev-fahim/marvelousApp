import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordService } from 'src/app/service/expenditure/record.service';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.scss']
})
export class RecordListComponent implements OnInit, OnDestroy {
  todays_all_expenditures: any[] = [];
  loading = true;

  constructor(public recordService: RecordService) { }

  ngOnInit() {
    this.recordService.get_all_expenditures({
      is_verified: '',
      amount: '',
      max_amount: '',
      min_amount: '',
      added_after: '',
      added_before: '',
      expend_time_after: '',
      expend_time_before: '',
      added_date: '',
      heading: '',
      ordering: '',
      serach: '',
    })
      .subscribe(
        (result: any) => {
          this.loading = false;
          return this.todays_all_expenditures = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
  }

  get_expend_length() {
    return this.todays_all_expenditures.length
  }

  is_loading() {
    return this.loading;
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loading = true;
  }

}
