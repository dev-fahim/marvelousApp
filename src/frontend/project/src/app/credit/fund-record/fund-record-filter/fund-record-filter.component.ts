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
    this.loading_on_filter = true;
    this.filtered_fund_data.emit(this.form.value);
  }

}
