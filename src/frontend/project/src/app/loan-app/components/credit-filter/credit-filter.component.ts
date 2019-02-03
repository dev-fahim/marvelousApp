import { SourceService } from './../../../service/credit/source.service';
import { CreditFundRecordListFilter } from './../../../service/credit/fund.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-credit-filter',
  templateUrl: './credit-filter.component.html',
  styleUrls: ['./credit-filter.component.scss']
})
export class CreditFilterComponent implements OnInit {
  @Output() filtered_fund_data = new EventEmitter<CreditFundRecordListFilter>();
  @Input() loading_on_filter = false;

  all_credit_fund_sources: string[] = [];

  collapse = false;

  /*
  fund_source=&amount=&added_after=&added_before=&max_amount=&min_amount=
  */
  form = new FormGroup({
    added: new FormControl(""),
    amount: new FormControl(""),
    fund_source: new FormControl(""),
    max_amount: new FormControl(""),
    min_amount: new FormControl(""),
    ordering: new FormControl(""),
    added_before: new FormControl(""),
    added_after: new FormControl(""),
    search: new FormControl("")
  })

  constructor(private _sourceService: SourceService) { }

  toggle_collapse() {
    return this.collapse = !this.collapse;
  }

  ngOnInit() {
    this._sourceService.get_sources_name()
      .subscribe(
        (response) => {
          this.all_credit_fund_sources = response;
        }
      )
  }

  onSubmit() {
    if (this.form.get('added').value === null) { this.form.get('added').setValue("") }
    if (this.form.get('amount').value === null) { this.form.get('amount').setValue("") }
    if (this.form.get('fund_source').value === null) { this.form.get('fund_source').setValue("") }
    if (this.form.get('max_amount').value === null) { this.form.get('max_amount').setValue("") }
    if (this.form.get('min_amount').value === null) { this.form.get('min_amount').setValue("") }
    if (this.form.get('ordering').value === null) { this.form.get('ordering').setValue("") }
    if (this.form.get('added_before').value === null) { this.form.get('added_before').setValue("") }
    if (this.form.get('added_after').value === null) { this.form.get('added_after').setValue("") }
    if (this.form.get('search').value === null) { this.form.get('search').setValue("") }
    this.filtered_fund_data.emit(this.form.value);
  }

}
