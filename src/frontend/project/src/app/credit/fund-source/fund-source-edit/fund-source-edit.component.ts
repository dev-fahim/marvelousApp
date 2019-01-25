import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-source-edit',
  templateUrl: './fund-source-edit.component.html',
  styleUrls: ['./fund-source-edit.component.scss']
})
export class FundSourceEditComponent implements OnInit {

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
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ])
  });

  constructor(private _headingService: HeadingService, private _router: Router) { }

  ngOnInit() {
    this._data.subscribe(
      x => {
        this.uuid = this.heading.uuid;
        this.form.setValue({
          heading_name: this.heading.heading_name,
          description: this.heading.description
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
            this.messages.splice(0, 0, { message: 'Espenditure Heading UPDATED successfuly.', type: 'positive' });
          },
          (error: AppError) => {
            this.loading = false;
            if (error instanceof BadInput) {
              this.messages.splice(0, 0, { message: 'You have entered invalid data or fund is limited. All fields and required and must be valid.', type: 'error' });
            }
            if (error instanceof Forbidden) {
              this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
            }
            if (error instanceof NotFound) {
              this.messages.splice(0, 0, { message: '404 Not Found', type: 'error' });
            }
            if (error instanceof UnAuthorized) {
              this._router.navigate(['/login'])
              this.messages.splice(0, 0, { message: 'You are not logged in.', type: 'error' });
            }
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
          this.messages.splice(0, 0, { message: 'Espenditure Heading DELETED successfuly.', type: 'positive' });
        },
          (error: AppError) => {
            this.loading_del = false;
            if (error instanceof BadInput) {
              this.messages.splice(0, 0, { message: 'Invalid UUID or fund is limited.', type: 'error' });
            }
            if (error instanceof Forbidden) {
              this.messages.splice(0, 0, { message: 'You don\'t have permission for this action.', type: 'error' });
            }
            if (error instanceof NotFound) {
              this.messages.splice(0, 0, { message: '404 Not Found', type: 'error' });
            }
            if (error instanceof UnAuthorized) {
              this._router.navigate(['/login'])
              this.messages.splice(0, 0, { message: 'You are not logged in.', type: 'error' });
            }
            if (error instanceof ServerError) {
              this.messages.splice(0, 0, { message: 'Internal Server Error.', type: 'error' });
            }
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
  }

}
