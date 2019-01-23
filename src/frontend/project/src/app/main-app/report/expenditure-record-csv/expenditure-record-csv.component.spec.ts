import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureRecordCsvComponent } from './expenditure-record-csv.component';

describe('ExpenditureRecordCsvComponent', () => {
  let component: ExpenditureRecordCsvComponent;
  let fixture: ComponentFixture<ExpenditureRecordCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenditureRecordCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureRecordCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
