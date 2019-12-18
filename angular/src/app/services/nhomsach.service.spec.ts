import { TestBed } from '@angular/core/testing';

import { NhomsachService } from './nhomsach.service';

describe('NhomsachService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhomsachService = TestBed.get(NhomsachService);
    expect(service).toBeTruthy();
  });
});
