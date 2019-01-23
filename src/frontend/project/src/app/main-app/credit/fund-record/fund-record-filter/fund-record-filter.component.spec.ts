import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRecordFilterComponent } from './fund-record-filter.component';

describe('FundRecordFilterComponent', () => {
  let component: FundRecordFilterComponent;
  let fixture: ComponentFixture<FundRecordFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRecordFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRecordFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
