import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingFilterComponent } from './heading-filter.component';

describe('HeadingFilterComponent', () => {
  let component: HeadingFilterComponent;
  let fixture: ComponentFixture<HeadingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
