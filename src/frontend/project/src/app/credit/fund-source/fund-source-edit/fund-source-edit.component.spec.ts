import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSourceEditComponent } from './fund-source-edit.component';

describe('FundSourceEditComponent', () => {
  let component: FundSourceEditComponent;
  let fixture: ComponentFixture<FundSourceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSourceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSourceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
