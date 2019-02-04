import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitArchiveComponent } from './debit-archive.component';

describe('DebitArchiveComponent', () => {
  let component: DebitArchiveComponent;
  let fixture: ComponentFixture<DebitArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
