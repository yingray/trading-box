import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of, switchMap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { BybitService } from 'src/app/core/services/bybit/bybit.service';
import { TradeRecord } from 'src/app/shared/models/kline.model';
import { GetTradingRecordAction } from './markets.actions';

const subject = webSocket('wss://stream.bybit.com/realtime');

export interface MarketsStateModel {
  symbol: string;
  price: number;
}

const defaults = {
  symbol: 'ETHUSD',
  price: 0,
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

  @Action(GetTradingRecordAction)
  getTradingRecord(
    ctx: StateContext<MarketsStateModel>,
    action: GetTradingRecordAction
  ) {
    if (this.send) {
      return of();
    }

    subject.next({ op: 'subscribe', args: ['trade.ETHUSD'] });
    this.send = true;

    return subject.pipe(
      switchMap((response: any) => {
        const trades = response?.data;
        if (trades) {
          this.setMarkets(ctx, trades[0]);
        }
        return of();
      })
    );
  }

  setMarkets(ctx: StateContext<MarketsStateModel>, trade: TradeRecord): void {
    ctx.patchState({
      symbol: trade.symbol,
      price: trade.price,
    });
  }
}
