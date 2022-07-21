import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { orderBy, remove, sortBy } from 'lodash';
import { of, switchMap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { BybitService } from 'src/app/core/services/bybit/bybit.service';
import {
  OrderbookItem,
  TradeRecord,
  WsResponse,
  WsTopic,
} from 'src/app/shared/models/kline.model';
import { GetTradingRecordAction } from './markets.actions';

const subject = webSocket('wss://stream.bybit.com/realtime');

export interface MarketsStateModel {
  symbol: string;
  price: number;
  orderbook: OrderbookItem[];
}

const defaults = {
  symbol: 'ETHUSD',
  price: 0,
  orderbook: [],
};

@State<MarketsStateModel>({
  name: 'markets',
  defaults,
})
@Injectable()
export class MarketsState {
  send = false;

  constructor(private bybitService: BybitService) {}

  @Selector([MarketsState])
  static getMarkets(marketsState: MarketsStateModel) {
    return marketsState;
  }

  @Selector([MarketsState])
  static getOrderbook(marketsState: MarketsStateModel) {
    const offset = 10;
    return marketsState.orderbook
      .slice(0, marketsState.orderbook.length - offset)
      .slice(offset);
  }

  @Selector([MarketsState])
  static getSellOrderbook(marketsState: MarketsStateModel) {
    return orderBy(
      marketsState.orderbook.filter((ob) => ob.side === 'Sell'),
      ['price'],
      ['asc']
    );
  }

  @Selector([MarketsState])
  static getBuyOrderbook(marketsState: MarketsStateModel) {
    return orderBy(
      marketsState.orderbook.filter((ob) => ob.side === 'Buy'),
      ['price'],
      ['desc']
    );
  }

  @Action(GetTradingRecordAction)
  getTradingRecord(
    ctx: StateContext<MarketsStateModel>,
    action: GetTradingRecordAction
  ) {
    if (this.send) {
      return of();
    }

    subject.next({
      op: 'subscribe',
      args: [
        `${WsTopic.trade}.ETHUSD`,
        // `${WsTopic.orderbook}.ETHUSD`
      ],
    });
    this.send = true;

    return subject.pipe(
      switchMap((response: any) => {
        this.setMarkets(ctx, response);
        return of();
      })
    );
  }

  setMarkets(ctx: StateContext<MarketsStateModel>, response: WsResponse): void {
    if (!response.topic) {
      return;
    }

    if (response.topic.startsWith(WsTopic.trade)) {
      const trade = response.data[0];
      if (trade) {
        ctx.patchState({
          symbol: trade.symbol,
          price: trade.price,
        });
      }
      return;
    }

    if (response.topic.startsWith(WsTopic.orderbook)) {
      const orderbook = response.data;
      if (response.type === 'snapshot') {
        ctx.patchState({
          orderbook: orderbook,
        });
      }

      let next = ctx.getState().orderbook;
      if (response.data.delete) {
        response.data.delete.forEach((d: OrderbookItem) => {
          next = next.filter((n) => n.id !== d.id);
        });
      }
      if (response.data.update) {
        response.data.update.forEach((d: OrderbookItem) => {
          next = next.map((n) => (n.id === d.id ? d : n));
        });
      }
      if (response.data.insert) {
        next = [...next, ...response.data.insert];
      }

      ctx.patchState({ orderbook: next });
      return;
    }
  }
}
