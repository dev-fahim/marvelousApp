import { Router } from '@angular/router';
import { ExpenditureHeadingPUTModel } from './../../../service/models';
import { BehaviorSubject } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { HeadingService } from '../../../service/expenditure/heading.service';
import { ExpenditureHeadingGETModel } from '../../../service/models';
import * as errors from '../../../common';

@Component({
  selector: 'app-heading-edit',
  templateUrl: './heading-edit.component.html',
  styleUrls: ['./heading-edit.component.scss']
})
export class HeadingEditComponent {
  loading = false;
  loading_del = false;
  private _data = new BehaviorSubject<ExpenditureHeadingGETModel>({
    id: 0,
    heading_name: '',
    description: '',
    updated: '',
    uuid: '',
    url: '',
    added: '',
    is_deleted: false
  });

  modal_update = false;
  modal = false;

  @Input()
  set heading(value: ExpenditureHeadingGETModel) {
    this._data.next(value);
  };

  get heading() {
    return this._data.getValue();
  }

  messages: { message: string, type: string }[] = [];
  uuid: string;

  form = new FormGroup({
    heading_name: new FormControl("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(30)
    ]),
    extra_description: new FormControl(""),
    is_deleted: new FormControl(false),
  });

  constructor(private _headingService: HeadingService, private _router: Router) { }

  toggle_modal_update() {
    return this.modal_update = !this.modal_update
  }

  toggle_modal() {
    return this.modal = !this.modal
  }

  ngOnInit() {
    this._data.subscribe(
      x => {
        this.uuid = this.heading.uuid;
        this.form.setValue({
          heading_name: this.heading.heading_name,
          extra_description: "",
          is_deleted: false
        })
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._headingService.update_heading(this.form.value, this.uuid)
        .subscribe(
          (next: ExpenditureHeadingPUTModel) => {
            this.loading = false;
            console.log('Updated')
            this.messages.splice(0, 0, { message: 'Debit Heading UPDATED successfuly.', type: 'positive' });
          },
          (error: errors.AppError) => {
            this.loading = false;
            let main_error = errors.throw_http_response_error(error);
            return this.messages.push({message: main_error.detail, type: main_error.type});
          }
        )
    }
  }

  onDelete() {
    if (this.form.valid) {
      this.loading_del = true;
      this.form.get('is_deleted').setValue(true);
      this._headingService.delete_heading(this.form.value, this.uuid)
        .subscribe((next: ExpenditureHeadingPUTModel) => {
          this.loading_del = false;
          this.messages.splice(0, 0, { message: 'Debit Heading DELETED successfuly.', type: 'positive' });
        },
        (error: errors.AppError) => {
          this.loading_del = false;
          let main_error = errors.throw_http_response_error(error);
          return this.messages.push({message: main_error.detail, type: main_error.type});
        }
        )
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._data.unsubscribe();
  }

  onReset() {
    this.messages = [];
    this.form.reset();
    this.uuid = undefined;
  }
}
