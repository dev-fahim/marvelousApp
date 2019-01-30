import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundLoginAgainComponent } from './fund-login-again.component';

describe('FundLoginAgainComponent', () => {
  let component: FundLoginAgainComponent;
  let fixture: ComponentFixture<FundLoginAgainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundLoginAgainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundLoginAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
