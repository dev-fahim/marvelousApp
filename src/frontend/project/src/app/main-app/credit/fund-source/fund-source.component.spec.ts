import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSourceComponent } from './fund-source.component';

describe('FundSourceComponent', () => {
  let component: FundSourceComponent;
  let fixture: ComponentFixture<FundSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
