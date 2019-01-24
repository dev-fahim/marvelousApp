import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFundPdfComponent } from './credit-fund-pdf.component';

describe('CreditFundPdfComponent', () => {
  let component: CreditFundPdfComponent;
  let fixture: ComponentFixture<CreditFundPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditFundPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditFundPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
