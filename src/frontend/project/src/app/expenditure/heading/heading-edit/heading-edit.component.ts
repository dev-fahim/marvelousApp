import { BehaviorSubject } from 'rxjs';
import { NotFound } from './../../../common/not-found';
import { AppError } from '../../../common/app-error';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { HeadingService } from '../../../service/expenditure/heading.service';
import { Router } from '@angular/router';
import { BadInput } from '../../../common/bad-input';
import { Forbidden } from '../../../common/forbidden';
import { UnAuthorized } from '../../../common/unauthorized-error';
import { ExpenditureHeadingGETModel } from '../../../service/models';
import { ServerError } from 'src/app/common/serve-error';

@Component({
  selector: 'app-heading-edit',
  templateUrl: './heading-edit.component.html',
  styleUrls: ['./heading-edit.component.scss']
})
export class HeadingEditComponent {
  loading = false;
  loading_del = false;
  private _data = new BehaviorSubject<ExpenditureHeadingGETModel>({
    heading_name: '',
    description: ''
  });

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
    ])
  });

  constructor(private _headingService: HeadingService, private _router: Router) { }

  throw_error(error: AppError) {
    if (error instanceof BadInput) {
      return this.messages.splice(0, 0, { message: 'Invalid UUID or fund is limited.', type: 'error' });
    }
    if (error instanceof Forbidden) {
      return this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
    }
    if (error instanceof NotFound) {
      return this.messages.splice(0, 0, { message: '404 Not Found', type: 'error' });
    }
    if (error instanceof UnAuthorized) {
      this._router.navigate(['/login'])
      return this.messages.splice(0, 0, { message: 'You are not logged in.', type: 'error' });
    }
    if (error instanceof ServerError) {
      return this.messages.splice(0, 0, { message: 'You have record which belongs to this heading name or Internal server error.', type: 'error' });
    }
    return this.messages.splice(0, 0, { message: 'An unexpected error ocurred.', type: 'error' });
  }

  ngOnInit() {
    this._data.subscribe(
      x => {
        this.uuid = this.heading.uuid;
        this.form.setValue({
          heading_name: this.heading.heading_name
        })
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this._headingService.update_heading(this.form.value, this.uuid)
        .subscribe(
          (next: ExpenditureHeadingGETModel) => {
            this.loading = false;
            console.log('Updated')
            this.messages.splice(0, 0, { message: 'Debit Heading UPDATED successfuly.', type: 'positive' });
          },
          (error: AppError) => {
            this.loading = false;
            return this.throw_error(error);
          }
        )
    }
  }

  onDelete() {
    if (this.form.valid) {
      this.loading_del = true;
      this._headingService.delete_heading(this.uuid)
        .subscribe((next: ExpenditureHeadingGETModel) => {
          this.loading_del = false;
          this.messages.splice(0, 0, { message: 'Debit Heading DELETED successfuly.', type: 'positive' });
        },
          (error: AppError) => {
            this.loading_del = false;
            return this.throw_error(error);
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
