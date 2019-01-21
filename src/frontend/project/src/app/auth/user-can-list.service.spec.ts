import { TestBed } from '@angular/core/testing';

import { UserCanListService } from './user-can-list.service';

describe('UserCanListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCanListService = TestBed.get(UserCanListService);
    expect(service).toBeTruthy();
  });
});
