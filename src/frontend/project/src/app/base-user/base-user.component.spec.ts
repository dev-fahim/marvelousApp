import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUserComponent } from './base-user.component';

describe('BaseUserComponent', () => {
  let component: BaseUserComponent;
  let fixture: ComponentFixture<BaseUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
