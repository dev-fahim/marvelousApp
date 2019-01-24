import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUserViewComponent } from './base-user-view.component';

describe('BaseUserViewComponent', () => {
  let component: BaseUserViewComponent;
  let fixture: ComponentFixture<BaseUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
