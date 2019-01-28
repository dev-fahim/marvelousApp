import { CreditFundSourceFilterModel } from './../../../service/models';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-fund-source-filter',
  templateUrl: './fund-source-filter.component.html',
  styleUrls: ['./fund-source-filter.component.scss']
})
export class FundSourceFilterComponent implements OnInit {

  @Output() filtered_fund_data = new EventEmitter<CreditFundSourceFilterModel>();
  @Input() loading_on_filter = false;

  form = new FormGroup({
    ordering: new FormControl(""),
    search: new FormControl("")
  })

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.get("ordering").value === null) {this.form.get("ordering").setValue("")}
    if (this.form.get("search").value === null) {this.form.get("search").setValue("")}
    this.loading_on_filter = true;
    this.filtered_fund_data.emit(this.form.value);
  }

}
