import { TestBed } from '@angular/core/testing';

import { UserCanEditService } from './user-can-edit.service';

describe('UserCanEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCanEditService = TestBed.get(UserCanEditService);
    expect(service).toBeTruthy();
  });
});
