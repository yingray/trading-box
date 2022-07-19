import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';
import { BybitService } from 'src/app/core/services/bybit/bybit.service';
import { TradeRecordResponse } from 'src/app/shared/models/kline.model';
import { GetTradingRecordAction } from './markets.actions';

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
    return this.bybitService.getTradingRecord('ETHUSD', 1).pipe(
      tap<TradeRecordResponse>(
        (response: TradeRecordResponse) => {
          return this.setMarkets(ctx, response);
        },
        () => {}
      )
    );
  }

  setMarkets(
    ctx: StateContext<MarketsStateModel>,
    response: TradeRecordResponse
  ): void {
    ctx.patchState({
      symbol: response.result[0].symbol,
      price: response.result[0].price,
    });
  }
}
