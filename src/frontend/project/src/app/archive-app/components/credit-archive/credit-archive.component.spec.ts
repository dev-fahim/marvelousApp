import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditArchiveComponent } from './credit-archive.component';

describe('CreditArchiveComponent', () => {
  let component: CreditArchiveComponent;
  let fixture: ComponentFixture<CreditArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
