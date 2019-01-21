import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-record-filter',
  templateUrl: './record-filter.component.html',
  styleUrls: ['./record-filter.component.scss']
})
export class RecordFilterComponent implements OnInit {
  @Output() filter_data = new EventEmitter();

  filter_form = new FormGroup({
    is_verified: new FormControl(""),
    amount: new FormControl(""),
    max_amount: new FormControl(""),
    min_amount: new FormControl(""),
    added_after: new FormControl(""),
    added_before: new FormControl(""),
    expend_time_after: new FormControl(""),
    expend_time_before: new FormControl(""),
    added_date: new FormControl(""),
    heading: new FormControl(""),
    search: new FormControl(""),
    ordering: new FormControl("")
  })

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.filter_data.emit(this.filter_form.value);
  }

}
