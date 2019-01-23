import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSourceAddComponent } from './fund-source-add.component';

describe('FundSourceAddComponent', () => {
  let component: FundSourceAddComponent;
  let fixture: ComponentFixture<FundSourceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSourceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSourceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
