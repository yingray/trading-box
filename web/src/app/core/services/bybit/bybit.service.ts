import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromPairs } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  KLine,
  KLineMap,
  TradeRecordResponse,
} from 'src/app/shared/models/kline.model';
import { storage } from 'src/app/shared/utils/storage.util';
import { getQS } from 'src/app/shared/utils/string.util';
import {
  getDateForZeroSecOfMin,
  getBybitTime,
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
      console.log({ cache: cache.result });
      return of(cache);
    }

    return this.http.get(url).pipe(
      map((resp) => {
        storage.set(url, resp);
        console.log(resp);
        return resp;
      })
    );
  }

  getOrderBook(symbol: string) {
    const qs = getQS({ symbol });
    const url = `${this.baseUrl}/v2/public/orderBook/L2?${qs}`;
    return this.http.get(url);
  }

  getTradingRecord(
    symbol: string,
    limit: number
  ): Observable<TradeRecordResponse> {
    const qs = getQS({ symbol, limit: String(limit) });
    const url = `${this.baseUrl}/v2/public/trading-records?${qs}`;
    return this.http.get<TradeRecordResponse>(url);
  }

  getKLine(symbol: string, dateFrom: Date): Observable<{ result: KLine[] }> {
    const bybitTimeFrom = getBybitTime(getDateForZeroSecOfMin(dateFrom));

    const kLineMap = storage.get(`kl-${symbol}`) as KLineMap;

    if (kLineMap && bybitTimeFrom in kLineMap) {
      return of({ result: [] });
    }

    const timeStr = String(bybitTimeFrom);
    const qs = getQS({
      symbol: symbol,
      interval: '1',
      from: timeStr,
      limit: '200',
    });
    const url = `${this.baseUrl}/v2/public/kline/list?${qs}`;
    return this.http.get(url).pipe(
      // return of({ result: [] }).pipe(
      //   timeout(2000),
      map((resp: any) => {
        const klines = resp.result as KLine[];
        const key = ['kl', symbol].join('-');
        const prev = (kLineMap ? kLineMap : {}) as KLineMap;
        const next = {
          ...prev,
          ...fromPairs(klines.map((kl) => [kl.open_time, kl])),
        } as KLineMap;
        storage.set(key, next);
        return resp as { result: KLine[] };
      }),
      catchError(() => of({ result: [] }))
    );
  }
}
