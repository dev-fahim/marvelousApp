import { TestBed } from '@angular/core/testing';

import { UserCanRetrieveService } from './user-can-retrieve.service';

describe('UserCanRetrieveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCanRetrieveService = TestBed.get(UserCanRetrieveService);
    expect(service).toBeTruthy();
  });
});
