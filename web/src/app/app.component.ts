import { Component, OnInit } from '@angular/core';
import Big from 'big.js';
import { fromPairs, uniqBy } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BybitService } from './core/services/bybit/bybit.service';
import { TradingBoxService } from './core/services/trading-box/trading-box.service';
import { Order, Side } from './shared/models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web';

  orders$: Observable<Order[]>;
  market$: Observable<any>;
  positions$: Observable<any>;

  constructor(
    private bybitService: BybitService,
    private tradingBoxService: TradingBoxService
  ) {
    this.orders$ = tradingBoxService.getAllOrdersWithCheck();
    this.market$ = this.orders$.pipe(
      switchMap((orders) => {
        const symbols = uniqBy(orders, 'symbol').map((orders) => orders.symbol);
        return combineLatest(
          symbols.map((symbol) => this.bybitService.getTradingRecord(symbol, 1))
        );
      }),
      map((resps) =>
        fromPairs(
          resps.map((resp: any) => [
            resp.result[0].symbol,
            resp.result[0].price,
          ])
        )
      )
    );
    this.positions$ = combineLatest([this.market$, this.orders$]).pipe(
      map((result) => {
        const [market, orders] = result;
        const positions = orders.map((order) => {
          const curPrice = Big(market[order.symbol]);
          const pnl = curPrice
            .minus(order.price)
            .mul(order.size)
            .mul(order.side === Side.buy ? 1 : -1);
          const pnlr = pnl.div(order.price).mul(100).toFixed(2);
          return {
            pnl: pnl.toNumber(),
            pnlr: `${pnlr.toString()}%`,
            order: order,
          };
        });
        return positions;
      })
    );
  }

  ngOnInit(): void {
    // const order = {
    //   symbol: 'ETHUSD',
    //   post_date: new Date('Wed Jul 13 2022 10:34:32 GMT+0800'),
    //   size: 0.01,
    //   price: 1058,
    //   side: Side.sell,
    // };
    // this.tradingBoxService.postOrder(order);
  }
}
