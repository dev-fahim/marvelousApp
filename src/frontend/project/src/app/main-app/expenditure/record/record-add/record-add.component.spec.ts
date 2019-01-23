import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAddComponent } from './record-add.component';

describe('RecordAddComponent', () => {
  let component: RecordAddComponent;
  let fixture: ComponentFixture<RecordAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
