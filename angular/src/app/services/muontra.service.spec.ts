import { TestBed } from '@angular/core/testing';

import { MuontraService } from './muontra.service';

describe('MuontraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MuontraService = TestBed.get(MuontraService);
    expect(service).toBeTruthy();
  });
});
