import { TestBed } from '@angular/core/testing';
import { KLine } from 'src/app/shared/models/kline.model';
import { Side } from 'src/app/shared/models/order.model';

import { checkFill, TradingBoxService } from './trading-box.service';

describe('TradingBoxService', () => {
  let service: TradingBoxService;
  const kline = {
    high: '1553',
    low: '1551',
    open_time: 1658567040,
  } as KLine;

  const openDate = new Date(kline.open_time * 1000);

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(TradingBoxService);
  // });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('check fill', () =>
    checkFill(kline, Side.buy, 100).subscribe((resp) => {
      expect(resp).toBeNull();
    }));

  it('check fill', () =>
    checkFill(kline, Side.buy, 1552).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.buy, 1554).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.sell, 100).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.sell, 1552).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.sell, 1554).subscribe((resp) => {
      expect(resp).toBeNull();
    }));

  it('check fill', () =>
    checkFill(kline, Side.buy, 100, true).subscribe((resp) => {
      expect(resp).toBeNull();
    }));

  it('check fill', () =>
    checkFill(kline, Side.buy, 1552, true).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.buy, 1554, true).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.sell, 100, true).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.sell, 1552, true).subscribe((resp) => {
      expect(resp).toEqual(openDate);
    }));

  it('check fill', () =>
    checkFill(kline, Side.sell, 1554, true).subscribe((resp) => {
      expect(resp).toBeNull();
    }));
});
