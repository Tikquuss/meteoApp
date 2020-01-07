import { TestBed } from '@angular/core/testing';

import { RemplissageService } from './remplissage.service';

describe('RemplissageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemplissageService = TestBed.get(RemplissageService);
    expect(service).toBeTruthy();
  });
});
