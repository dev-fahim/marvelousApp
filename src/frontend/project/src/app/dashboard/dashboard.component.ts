import { Component } from '@angular/core';
import { SourceService } from '../service/credit/source.service';
import { HeadingService } from '../service/expenditure/heading.service';
import { RecordService } from '../service/expenditure/record.service';
import { today_date } from '../service/today.date';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  title = 'project';
  fund_status = true;
  all_sources: any;
  all_headings: any;
  todays_all_expenditures: any[] = [];
  myDate: any;

  constructor(
    public sourceService: SourceService,
    public headingService: HeadingService,
    public recordService: RecordService
  ) {
  }

  toggle_fund() {
    return this.fund_status = !this.fund_status;
  }

  ngOnInit() {
    const today = today_date()
    this.sourceService.get_all_sources()
      .subscribe(
        (result) => {
          return this.all_sources = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
    this.headingService.get_all_headings()
      .subscribe(
        (result) => {
          return this.all_headings = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
    this.recordService.get_all_expenditures({
      is_verified: '',
      amount: '',
      max_amount: '',
      min_amount: '',
      added_after: '',
      added_before: '',
      expend_time_after: '',
      expend_time_before: '',
      added_date: today,
      heading: '',
      ordering: '',
      serach: '',
    })
      .subscribe(
        (result: any) => {
          return this.todays_all_expenditures = result;
        },
        (errors) => {
          return console.log(errors);
        }
      )
  }

  get_fund_status() {
    return this.fund_status;
  }

  get_expend_length() {
    return this.todays_all_expenditures.length
  }
}
