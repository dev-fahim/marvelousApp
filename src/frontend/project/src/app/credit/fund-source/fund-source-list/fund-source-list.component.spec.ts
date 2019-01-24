import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSourceListComponent } from './fund-source-list.component';

describe('FundSourceListComponent', () => {
  let component: FundSourceListComponent;
  let fixture: ComponentFixture<FundSourceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSourceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSourceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
