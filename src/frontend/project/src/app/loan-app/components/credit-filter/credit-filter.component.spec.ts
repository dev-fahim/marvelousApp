import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFilterComponent } from './credit-filter.component';

describe('CreditFilterComponent', () => {
  let component: CreditFilterComponent;
  let fixture: ComponentFixture<CreditFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
