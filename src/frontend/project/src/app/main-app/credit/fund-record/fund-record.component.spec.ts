import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRecordComponent } from './fund-record.component';

describe('FundRecordComponent', () => {
  let component: FundRecordComponent;
  let fixture: ComponentFixture<FundRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
