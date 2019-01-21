import { TestBed } from '@angular/core/testing';

import { UserCanAddService } from './user-can-add.service';

describe('UserCanAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCanAddService = TestBed.get(UserCanAddService);
    expect(service).toBeTruthy();
  });
});
