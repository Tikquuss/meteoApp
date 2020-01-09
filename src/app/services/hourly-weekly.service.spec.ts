import { TestBed } from '@angular/core/testing';

import { HourlyWeeklyService } from './hourly-weekly.service';

describe('HourlyWeeklyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HourlyWeeklyService = TestBed.get(HourlyWeeklyService);
    expect(service).toBeTruthy();
  });
});
