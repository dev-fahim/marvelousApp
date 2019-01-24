import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeadingService } from '../../../service/expenditure/heading.service';

@Component({
  selector: 'app-record-filter',
  templateUrl: './record-filter.component.html',
  styleUrls: ['./record-filter.component.scss']
})
export class RecordFilterComponent implements OnInit {
  @Output() filter_data = new EventEmitter();
  all_headings = [];
  loading = false;

  filter_form = new FormGroup({
    is_verified: new FormControl(""),
    amount: new FormControl(""),
    max_amount: new FormControl(""),
    min_amount: new FormControl(""),
    added_after: new FormControl(""),
    added_before: new FormControl(""),
    expend_date_after: new FormControl(""),
    expend_date_before: new FormControl(""),
    added_date: new FormControl(""),
    heading: new FormControl(""),
    search: new FormControl(""),
    ordering: new FormControl("")
  })

  constructor(private _headingService: HeadingService) { }

  ngOnInit() {
    this.loading = true;
    this._headingService.get_all_headings()
      .subscribe(
        (result) => {
          for (let heading of result) {
            this.all_headings.push(heading.heading_name);
          }
          this.loading = false;
        }
      )
  }

  onSubmit() {
    this.filter_data.emit(this.filter_form.value);
  }

}
