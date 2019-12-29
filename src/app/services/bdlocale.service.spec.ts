import { TestBed } from '@angular/core/testing';

import { BdlocaleService } from './bdlocale.service';

describe('BdlocaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BdlocaleService = TestBed.get(BdlocaleService);
    expect(service).toBeTruthy();
  });
});
