import { TestBed } from '@angular/core/testing';

import { ChomuonService } from './chomuon.service';

describe('ChomuonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChomuonService = TestBed.get(ChomuonService);
    expect(service).toBeTruthy();
  });
});
