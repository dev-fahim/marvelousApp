import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSourceFilterComponent } from './fund-source-filter.component';

describe('FundSourceFilterComponent', () => {
  let component: FundSourceFilterComponent;
  let fixture: ComponentFixture<FundSourceFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSourceFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSourceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
