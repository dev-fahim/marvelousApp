import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitAddComponent } from './debit-add.component';

describe('DebitAddComponent', () => {
  let component: DebitAddComponent;
  let fixture: ComponentFixture<DebitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
