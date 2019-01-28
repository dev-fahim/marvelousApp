import { CreditFundRecordListFilter } from './../../../service/credit/fund.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-fund-record-filter',
  templateUrl: './fund-record-filter.component.html',
  styleUrls: ['./fund-record-filter.component.scss']
})
export class FundRecordFilterComponent implements OnInit {
  @Output() filtered_fund_data = new EventEmitter<CreditFundRecordListFilter>();
  @Input() loading_on_filter = false;
  
  form = new FormGroup({
    added: new FormControl(""),
    amount: new FormControl(""),
    fund_source: new FormControl(""),
    max_amount: new FormControl(""),
    min_amount: new FormControl(""),
    ordering: new FormControl(""),
    search: new FormControl("")
  })

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.get('added').value === null) {this.form.get('added').setValue("")}
    if (this.form.get('amount').value === null) {this.form.get('amount').setValue("")}
    if (this.form.get('fund_source').value === null) {this.form.get('fund_source').setValue("")}
    if (this.form.get('max_amount').value === null) {this.form.get('max_amount').setValue("")}
    if (this.form.get('min_amount').value === null) {this.form.get('min_amount').setValue("")}
    if (this.form.get('ordering').value === null) {this.form.get('ordering').setValue("")}
    if (this.form.get('search').value === null) {this.form.get('search').setValue("")}
    this.filtered_fund_data.emit(this.form.value);
  }

}
