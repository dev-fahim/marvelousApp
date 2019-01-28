import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HeadingService } from '../../../service/expenditure/heading.service';
import { RecordService } from 'src/app/service/expenditure/record.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-record-filter',
  templateUrl: './record-filter.component.html',
  styleUrls: ['./record-filter.component.scss']
})
export class RecordFilterComponent implements OnInit {
  @Output() filter_data = new EventEmitter();
  all_headings = [];
  loading = false;
  pdf_url: string;
  csv_url: string;
  has_url = false;

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

  constructor(private _headingService: HeadingService, private _recordService: RecordService) { }

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
    if (this.filter_form.get('amount').value === null) {this.filter_form.get('amount').setValue("")}
    if (this.filter_form.get('max_amount').value === null) {this.filter_form.get('max_amount').setValue("")}
    if (this.filter_form.get('min_amount').value === null) {this.filter_form.get('min_amount').setValue("")}
    if (this.filter_form.get('added_before').value === null) {this.filter_form.get('added_before').setValue("")}
    if (this.filter_form.get('added_after').value === null) {this.filter_form.get('added_after').setValue("")}
    if (this.filter_form.get('is_verified').value === null) {this.filter_form.get('is_verified').setValue("")}
    if (this.filter_form.get('expend_date_after').value === null) {this.filter_form.get('expend_date_after').setValue("")}
    if (this.filter_form.get('expend_date_before').value === null) {this.filter_form.get('expend_date_before').setValue("")}
    if (this.filter_form.get('added_date').value === null) {this.filter_form.get('added_date').setValue("")}
    if (this.filter_form.get('heading').value === null) {this.filter_form.get('heading').setValue("")}
    if (this.filter_form.get('search').value === null) {this.filter_form.get('search').setValue("")}
    if (this.filter_form.get('ordering').value === null) {this.filter_form.get('ordering').setValue("")}
    this.filter_data.emit(this.filter_form.value);
  }

  genUrl() {
    
    let url = '?';
    Object.keys(this.filter_form.value).forEach((key) => {
      url = url + '&' + key + '=' + this.filter_form.get(key).value
    });
    this.has_url = true;
    this.pdf_url = 'http://localhost:8000/api/expenditure/records-report-pdf/' + url;
    this.csv_url = 'http://localhost:8000/api/expenditure/records-mail-csv/' + url;
    return true;
  }

  getPDFUrl() {
    return this.pdf_url;
  }

  getMailCSV() {
    return this.csv_url;
  }

}
