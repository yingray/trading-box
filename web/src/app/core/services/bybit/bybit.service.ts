import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { storage } from 'src/app/shared/utils/storage.util';
import { getQS } from 'src/app/shared/utils/string.util';
import {
  getDateForZeroSecOfMin,
  getTimeToSec,
} from 'src/app/shared/utils/time.util';

@Injectable({
  providedIn: 'root',
})
export class BybitService {
  private baseUrl = 'https://api-testnet.bybit.com';

  constructor(private http: HttpClient) {}

  cacheHttpGet(url: string): Observable<any> {
    const cache = storage.get(url);
    if (cache) {
      return of(cache);
    }

    return this.http.get(url).pipe(
      map((resp) => {
        storage.set(url, resp);
        return resp;
      })
    );
  }

  getOrderBook(symbol: string) {
    const qs = getQS({ symbol });
    const url = `${this.baseUrl}/v2/public/orderBook/L2?${qs}`;
    return this.http.get(url);
  }

  getTradingRecord(symbol: string, limit: number) {
    const qs = getQS({ symbol, limit: String(limit) });
    const url = `${this.baseUrl}/v2/public/trading-records?${qs}`;
    return this.http.get(url);
  }

  getKLine(symbol: string, dateFrom: Date) {
    const timeStr = String(getTimeToSec(getDateForZeroSecOfMin(dateFrom)));
    const qs = getQS({
      symbol: symbol,
      interval: '1',
      from: timeStr,
      limit: '200',
    });
    const url = `${this.baseUrl}/v2/public/kline/list?${qs}`;
    return this.cacheHttpGet(url);
  }
}
