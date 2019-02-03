import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExpendComponent } from './history-expend.component';

describe('HistoryExpendComponent', () => {
  let component: HistoryExpendComponent;
  let fixture: ComponentFixture<HistoryExpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryExpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryExpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
