import { TestBed } from '@angular/core/testing';

import { CosmosState } from './cosmos.state';

describe('CosmosState', () => {
  let service: CosmosState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmosState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
