import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFundCsvComponent } from './credit-fund-csv.component';

describe('CreditFundCsvComponent', () => {
  let component: CreditFundCsvComponent;
  let fixture: ComponentFixture<CreditFundCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditFundCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditFundCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
