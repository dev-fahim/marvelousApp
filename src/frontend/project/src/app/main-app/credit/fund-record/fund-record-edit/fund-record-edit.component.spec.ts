import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRecordEditComponent } from './fund-record-edit.component';

describe('FundRecordEditComponent', () => {
  let component: FundRecordEditComponent;
  let fixture: ComponentFixture<FundRecordEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRecordEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
