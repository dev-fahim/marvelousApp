import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCreditComponent } from './history-credit.component';

describe('HistoryCreditComponent', () => {
  let component: HistoryCreditComponent;
  let fixture: ComponentFixture<HistoryCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
