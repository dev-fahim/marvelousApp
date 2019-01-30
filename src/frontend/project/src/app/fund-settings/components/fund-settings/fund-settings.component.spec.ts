import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundSettingsComponent } from './fund-settings.component';

describe('FundSettingsComponent', () => {
  let component: FundSettingsComponent;
  let fixture: ComponentFixture<FundSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
