import { TestBed } from '@angular/core/testing';

import { TradingBoxService } from './trading-box.service';

describe('TradingBoxService', () => {
  let service: TradingBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
