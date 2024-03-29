import { Injectable } from '@angular/core';
import { addMinutes, isAfter, isBefore } from 'date-fns';
import { isEmpty } from 'lodash';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { KLine, KLineMap } from 'src/app/shared/models/kline.model';
import { CloseType, Order, Side } from 'src/app/shared/models/order.model';
import { storage } from 'src/app/shared/utils/storage.util';
import {
  getDateForZeroSecOfMin,
  getBybitTime,
} from 'src/app/shared/utils/time.util';
import { BybitService } from '../bybit/bybit.service';

export function checkFill(
  kLine: KLine,
  orderSide: Side,
  orderPrice: number,
  stopLoss?: boolean
): Observable<Date | null> {
  const time = kLine.open_time || kLine.end || 0;
  console.log(
    '[check fill]: ',
    time,
    kLine.low,
    kLine.high,
    orderSide,
    orderPrice,
    'stop:',
    !!stopLoss
  );
  const openDate = new Date(time * 1000);

  if (stopLoss) {
    if (orderSide === Side.buy && orderPrice >= Number(kLine.low)) {
      return of(openDate);
    }
    if (orderSide === Side.sell && orderPrice <= Number(kLine.high)) {
      return of(openDate);
    }
  }

  if (orderSide === Side.buy && orderPrice >= Number(kLine.high)) {
    return of(openDate);
  }
  if (orderSide === Side.sell && orderPrice <= Number(kLine.low)) {
    return of(openDate);
  }
  if (Number(kLine.low) <= orderPrice && orderPrice <= Number(kLine.high)) {
    return of(openDate);
  }

  return of(null);
}

@Injectable({
  providedIn: 'root',
})
export class TradingBoxService {
  constructor(private bybitService: BybitService) {}

  getAllOrders(): Observable<Order[]> {
    const keys = storage.keys();
    return of(
      keys
        .filter((key) => key.startsWith('order-'))
        .map((key) => storage.get(key))
        .map((order) => {
          const dks = Object.keys(order).filter((k) => k.endsWith('_date'));
          for (let dk of dks) {
            order[dk] = order[dk] ? new Date(order[dk]) : undefined;
          }
          return order;
        })
    );
  }

  getAllOrdersWithCheck(): Observable<Order[]> {
    return this.getAllOrders().pipe(
      switchMap((orders) => {
        return combineLatest(
          orders.map((order) => this.checkOrderIsFilled(order))
        );
      }),
      shareReplay(1)
    );
  }

  postOrder(order: Order) {
    const postDate = getDateForZeroSecOfMin(order.post_date);
    const orderKey = [
      'order',
      postDate.getTime(),
      order.side,
      order.size,
      order.price,
    ].join('-');
    storage.set(orderKey, order);
    return of({ result: 'ok' });
  }

  removeOrder(order: Order) {
    const postDate = getDateForZeroSecOfMin(order.post_date);
    const orderKey = [
      'order',
      postDate.getTime(),
      order.side,
      order.size,
      order.price,
    ].join('-');
    storage.remove(orderKey);
    return of({ result: 'ok' });
  }

  checkOrderIsFilled(order: Order): Observable<Order> {
    if (order.close_type) {
      return of(order);
    }

    console.log('--- check ---');
    const checkedDate = order.latest_checked_date
      ? order.latest_checked_date
      : order.post_date;
    return this.getFilledDate(
      order.symbol,
      order.price,
      order.side,
      checkedDate
    ).pipe(
      // check the position open or not
      map((result) => {
        const { fill, check } = result;
        let newOrder = {
          ...order,
          latest_checked_date: check,
        } as Order;
        if (fill) {
          newOrder.fill_date = fill;
        }
        this.postOrder(newOrder);
        return newOrder;
      }),
      // check the position close or not
      switchMap((order) => {
        if (
          order.close_type ||
          !order.fill_date ||
          !order.stop_loss_price ||
          !order.take_profit_price
        ) {
          return of(order);
        }

        const closeSide = order.side == Side.buy ? Side.sell : Side.buy;
        return combineLatest([
          this.getFilledDate(
            order.symbol,
            order.stop_loss_price,
            closeSide,
            checkedDate,
            true
          ),
          this.getFilledDate(
            order.symbol,
            order.take_profit_price,
            closeSide,
            checkedDate
          ),
        ]).pipe(
          map((result) => {
            const [{ fill: stop_loss_date }, { fill: take_profit_date }] =
              result;

            if (
              (take_profit_date && !stop_loss_date) ||
              (take_profit_date &&
                stop_loss_date &&
                isBefore(take_profit_date, stop_loss_date))
            ) {
              order.close_type = CloseType.success;
              order.close_date = take_profit_date;
            } else if (
              (stop_loss_date && !take_profit_date) ||
              (stop_loss_date &&
                take_profit_date &&
                isBefore(stop_loss_date, take_profit_date))
            ) {
              order.close_type = CloseType.fail;
              order.close_date = stop_loss_date;
            }

            this.postOrder(order);
            return order;
          })
        );
      })
    );
  }

  getKLineMap(symbol: string, noCache?: boolean): KLineMap | null {
    const key = `kl-${symbol}`;
    return storage.get(key);
  }

  getFilledDate(
    symbol: string,
    price: number,
    side: Side,
    dateFrom: Date,
    stopLoss?: boolean
  ): Observable<{ fill?: Date; check: Date }> {
    const kLineMap = this.getKLineMap(symbol);
    const bybitTimeFrom = getBybitTime(getDateForZeroSecOfMin(dateFrom));
    const bybitTimeNow = getBybitTime(getDateForZeroSecOfMin(new Date()));

    if (bybitTimeFrom >= bybitTimeNow) {
      console.log('(1) end: ', dateFrom);
      return of({ check: new Date(bybitTimeNow * 1000) });
    }

    if (!kLineMap || !kLineMap[bybitTimeFrom]) {
      console.log('(2): ', dateFrom);
      return this.bybitService.getKLine(symbol, addMinutes(dateFrom, -1)).pipe(
        switchMap((resp) => {
          if (!resp || !resp?.result.length) {
            console.log('(2)-1: end', dateFrom);
            return of({ check: new Date(bybitTimeNow * 1000) });
          }

          const newKLineMap = this.getKLineMap(symbol);
          if (!newKLineMap || !(bybitTimeFrom in newKLineMap)) {
            console.log('(2)-2: end', dateFrom);
            return of({ check: new Date(bybitTimeNow * 1000) });
          }
          console.log('(2)-3:  continue', dateFrom);
          return this.getFilledDate(symbol, price, side, dateFrom);
        })
      );
    }

    const kLine = kLineMap[bybitTimeFrom];
    console.log('before(3): ', side, price, kLine, stopLoss);
    return checkFill(kLine, side, price, stopLoss).pipe(
      switchMap((date) => {
        if (date) {
          console.log('(3): end', dateFrom);
          return of({
            fill: new Date(kLine.open_time * 1000),
            check: new Date(bybitTimeNow * 1000),
          });
        }

        console.log('(4): continue', dateFrom);
        return this.getFilledDate(
          symbol,
          price,
          side,
          addMinutes(dateFrom, 200)
        );
      })
    );
  }
}
