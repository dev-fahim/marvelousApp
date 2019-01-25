import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-source-filter',
  templateUrl: './fund-source-filter.component.html',
  styleUrls: ['./fund-source-filter.component.scss']
})
export class FundSourceFilterComponent implements OnInit {

  @Output() filtered_fund_data = new EventEmitter<CreditFundRecordListFilter>();
  @Input() loading_on_filter = false;

  form = new FormGroup({
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
