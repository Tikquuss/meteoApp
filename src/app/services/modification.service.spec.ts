import { TestBed } from '@angular/core/testing';

import { ModificationService } from './modification.service';

describe('ModificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModificationService = TestBed.get(ModificationService);
    expect(service).toBeTruthy();
  });
});
