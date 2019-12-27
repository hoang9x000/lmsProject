import { TestBed } from '@angular/core/testing';

import { LuotmuonService } from './luotmuon.service';

describe('LuotmuonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LuotmuonService = TestBed.get(LuotmuonService);
    expect(service).toBeTruthy();
  });
});
