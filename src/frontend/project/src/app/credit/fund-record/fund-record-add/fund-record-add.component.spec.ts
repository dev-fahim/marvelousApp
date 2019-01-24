import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRecordAddComponent } from './fund-record-add.component';

describe('FundRecordAddComponent', () => {
  let component: FundRecordAddComponent;
  let fixture: ComponentFixture<FundRecordAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRecordAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRecordAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
