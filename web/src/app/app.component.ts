import { Component, OnInit } from '@angular/core';
import Big from 'big.js';
import { fromPairs, uniqBy } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { BybitService } from './core/services/bybit/bybit.service';
import { TradingBoxService } from './core/services/trading-box/trading-box.service';
import { Order, Position, Side } from './shared/models/order.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'web';
  Side = Side;

  items: MenuItem[];
  symbols: any[];
  sides: any[];

  formGroup: FormGroup;
  orders$: Observable<Order[]>;
  unfilledOrders$: Observable<any>;
  market$: Observable<any>;
  markets$: Observable<any>;
  positions$: Observable<any>;
  positionsSum$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private bybitService: BybitService,
    private tradingBoxService: TradingBoxService
  ) {
    this.items = [{ label: 'Trading Box' }];
    this.symbols = [
      { name: 'BTCUSD', code: 'BTCUSD' },
      { name: 'ETHUSD', code: 'ETHUSD' },
    ];
    this.sides = [
      { name: 'Buy', code: Side.buy },
      { name: 'Sell', code: Side.sell },
    ];
    this.formGroup = fb.group({
      symbol: [{ name: 'ETHUSD', code: 'ETHUSD' }, Validators.required],
      price: [1000, Validators.required],
      side: [{ name: 'Buy', code: Side.buy }, Validators.required],
      size: [1, Validators.required],
      post_date: [new Date(), Validators.required],
    });

    this.orders$ = tradingBoxService.getAllOrdersWithCheck();
    this.unfilledOrders$ = this.orders$.pipe(
      map((orders) => orders.filter((order) => !order.fill_date))
    );
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
    this.markets$ = this.market$.pipe(map((market) => Object.entries(market)));
    this.positions$ = combineLatest([this.market$, this.orders$]).pipe(
      map((result) => {
        const [market, orders] = result;
        const positions = orders
          .filter((order) => !!order.fill_date)
          .map((order) => {
            const curPrice = Big(market[order.symbol]);
            const pnl = curPrice
              .minus(order.price)
              .mul(order.size)
              .mul(order.side === Side.buy ? 1 : -1);
            const pnlr = pnl.div(order.price).mul(100).toFixed(2);
            return {
              pnl: pnl.toString(),
              pnlr: `${pnlr.toString()}%`,
              market_price: curPrice.toNumber(),
              order: order,
            } as Position;
          });
        return positions;
      })
    );

    this.positionsSum$ = this.positions$.pipe(
      map((positions) => {
        const result = positions.reduce(
          (acc: any, cur: Position) => ({
            size: Big(acc.size)
              .add(Big(cur.order.size).mul(Big(cur.market_price)))
              .toNumber(),
            pnl: Big(acc.pnl).add(Big(cur.pnl)).toNumber(),
          }),
          { size: 0, pnl: 0 }
        );
        return result;
      })
    );
  }

  getSymbolIcon(symbol: string): string {
    const sym = symbol.replace('USD', '').toLowerCase();
    return `./assets/${sym}.svg`;
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.tradingBoxService.postOrder({
      symbol: this.formGroup.value.symbol.code,
      post_date: new Date(this.formGroup.value.post_date),
      size: this.formGroup.value.size,
      price: this.formGroup.value.price,
      side: this.formGroup.value.side.code,
    } as Order);
  }
}
