import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenditureRecordPdfComponent } from './expenditure-record-pdf.component';

describe('ExpenditureRecordPdfComponent', () => {
  let component: ExpenditureRecordPdfComponent;
  let fixture: ComponentFixture<ExpenditureRecordPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenditureRecordPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenditureRecordPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
