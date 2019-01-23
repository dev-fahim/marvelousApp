import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingAddComponent } from './heading-add.component';

describe('HeadingAddComponent', () => {
  let component: HeadingAddComponent;
  let fixture: ComponentFixture<HeadingAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadingAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
