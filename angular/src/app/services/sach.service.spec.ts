import { TestBed } from '@angular/core/testing';

import { SachService } from './sach.service';

describe('SachService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SachService = TestBed.get(SachService);
    expect(service).toBeTruthy();
  });
});
