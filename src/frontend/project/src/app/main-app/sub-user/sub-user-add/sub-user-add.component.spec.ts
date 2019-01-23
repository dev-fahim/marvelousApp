import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUserAddComponent } from './sub-user-add.component';

describe('SubUserAddComponent', () => {
  let component: SubUserAddComponent;
  let fixture: ComponentFixture<SubUserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
