import { TestBed } from '@angular/core/testing';

import { BackAppService } from './back-app.service';

describe('BackAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackAppService = TestBed.get(BackAppService);
    expect(service).toBeTruthy();
  });
});
