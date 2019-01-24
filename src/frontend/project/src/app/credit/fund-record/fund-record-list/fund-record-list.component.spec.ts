import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRecordListComponent } from './fund-record-list.component';

describe('FundRecordListComponent', () => {
  let component: FundRecordListComponent;
  let fixture: ComponentFixture<FundRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
