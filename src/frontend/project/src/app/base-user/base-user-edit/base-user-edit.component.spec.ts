import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUserEditComponent } from './base-user-edit.component';

describe('BaseUserEditComponent', () => {
  let component: BaseUserEditComponent;
  let fixture: ComponentFixture<BaseUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
