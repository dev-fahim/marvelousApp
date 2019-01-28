import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-heading-filter',
  templateUrl: './heading-filter.component.html',
  styleUrls: ['./heading-filter.component.scss']
})
export class HeadingFilterComponent implements OnInit {
  @Output() search_data = new EventEmitter()

  
  search: string;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.search === null) {this.search = ""}
    this.search_data.emit(this.search);
    this.search = ''
  }

}
