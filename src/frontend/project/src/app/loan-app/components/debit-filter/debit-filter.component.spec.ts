import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitFilterComponent } from './debit-filter.component';

describe('DebitFilterComponent', () => {
  let component: DebitFilterComponent;
  let fixture: ComponentFixture<DebitFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
