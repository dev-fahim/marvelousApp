import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAddComponent } from './credit-add.component';

describe('CreditAddComponent', () => {
  let component: CreditAddComponent;
  let fixture: ComponentFixture<CreditAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
