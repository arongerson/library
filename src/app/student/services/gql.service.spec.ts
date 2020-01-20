import { TestBed } from '@angular/core/testing';

import { GqlService } from './gql.service';

describe('GqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GqlService = TestBed.get(GqlService);
    expect(service).toBeTruthy();
  });
});
