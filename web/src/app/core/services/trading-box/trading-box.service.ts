import { Injectable } from '@angular/core';
import { map } from '@firebase/util';
import { addMinutes, isAfter } from 'date-fns';
import { isEmpty } from 'lodash';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KLine } from 'src/app/shared/models/kline.model';
import { Order } from 'src/app/shared/models/order.model';
import { storage } from 'src/app/shared/utils/storage.util';
import { getDateForZeroSecOfMin } from 'src/app/shared/utils/time.util';
import { BybitService } from '../bybit/bybit.service';

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
        .map(
          (order) =>
            ({
              ...order,
              post_date: order.post_date
                ? new Date(order.post_date)
                : undefined,
              fill_date: order.fill_date
                ? new Date(order.fill_date)
                : undefined,
            } as Order)
        )
    );
  }

  getAllOrdersWithCheck(): Observable<Order[]> {
    return this.getAllOrders().pipe(
      switchMap((orders) =>
        combineLatest(orders.map((order) => this.checkOrderIsFilled(order)))
      )
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
  }

  checkOrderIsFilled(order: Order, from?: Date): Observable<Order> {
    if (order.fill_date || (from && isAfter(from, new Date()))) {
      return of(order);
    }

    const postDate = getDateForZeroSecOfMin(order.post_date);
    const kFrom = from ? from : postDate;
    return this.bybitService.getKLine(order.symbol, kFrom).pipe(
      switchMap((resp) => {
        const kLines = resp.result as KLine[];
        if (isEmpty(resp) || !resp.result.length) {
          return of(order);
        }

        const fill = kLines.find(
          (kl) =>
            order.price >= Number(kl.low) && order.price <= Number(kl.high)
        );

        if (!fill) {
          const next = addMinutes(kFrom, 200);
          if (isAfter(next, new Date())) {
            return of(order);
          }
          return this.checkOrderIsFilled(order, next);
        }

        const newOrder = {
          ...order,
          fill_date: new Date((fill?.open_time || 0) * 1000),
        } as Order;

        this.postOrder(newOrder);
        return of(newOrder);
      })
    );
  }
}
