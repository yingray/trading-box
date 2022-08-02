import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import Big from 'big.js';
import { combineLatest, map, of, switchMap, tap } from 'rxjs';
import {
  checkFill,
  TradingBoxService,
} from 'src/app/core/services/trading-box/trading-box.service';
import {
  CloseType,
  CountForTabs,
  Order,
  Position,
  Side,
} from 'src/app/shared/models/order.model';
import {
  MarketsState,
  MarketsStateModel,
} from '../../markets/state/markets.state';
import {
  CheckOrderAction,
  GetOrdersAction,
  PostOrderAction,
  RemoveOrderAction,
} from './orders.actions';

export type OrdersStateModel = Order[];

@State<OrdersStateModel>({
  name: 'orders',
  defaults: [],
})
@Injectable()
export class OrdersState {
  constructor(private tradingBoxService: TradingBoxService) {}

  @Selector([])
  static getOrders(orders: Order[]) {
    return orders.filter((order) => !order.fill_date);
  }

  @Selector([MarketsState.getMarkets])
  static getFilledOrders(orders: Order[], market: MarketsStateModel) {
    return orders
      .filter((order) => !!order.fill_date)
      .map((order) => {
        let curPrice = Big(market.price);

        if (
          order.close_date &&
          order.take_profit_price &&
          order.stop_loss_price
        ) {
          curPrice =
            order.close_type === CloseType.success
              ? Big(order.take_profit_price)
              : Big(order.stop_loss_price);
        }

        const pnl = curPrice
          .minus(order.price)
          .mul(order.size)
          .mul(order.side === Side.buy ? 1 : -1);
        const pnlr = pnl.div(order.price).div(order.size).mul(100).toFixed(2);
        return {
          ...order,
          position_pnl: pnl.toNumber(),
          position_pnlr: `${pnlr}%`,
        } as Order;
      });
  }

  @Selector([OrdersState.getFilledOrders])
  static getPositions(_: Order[], filledOrders: Order[]) {
    return filledOrders.filter((order) => !order.close_date);
  }

  @Selector([OrdersState.getFilledOrders])
  static getClosedPositions(_: Order[], filledOrders: Order[]) {
    return filledOrders.filter((order) => order.close_date);
  }

  @Selector([
    OrdersState.getOrders,
    OrdersState.getPositions,
    OrdersState.getClosedPositions,
  ])
  static getCountForTabs(
    _: Order[],
    orders: Order[],
    positions: Order[],
    closedPositions: Order[]
  ) {
    return {
      order_count: orders.length,
      position_count: positions.length,
      closed_position_count: closedPositions.length,
    } as CountForTabs;
  }

  @Action(GetOrdersAction)
  getOrdersAction(
    ctx: StateContext<OrdersStateModel>,
    action: GetOrdersAction
  ) {
    ctx.setState([]);

    return this.tradingBoxService.getAllOrdersWithCheck().pipe(
      tap<Order[]>(
        (response: Order[]) => {
          return this.setOrders(ctx, response);
        },
        () => {}
      )
    );
  }

  setOrders(ctx: StateContext<OrdersStateModel>, response: Order[]): void {
    response.sort(
      (a, b) =>
        new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
    );
    ctx.setState(response);
  }

  @Action(PostOrderAction)
  postOrderAction(
    ctx: StateContext<OrdersStateModel>,
    action: PostOrderAction
  ) {
    const newOrder = {
      symbol: action.order.symbol || 'ETHUSD',
      post_date: action.order.post_date || new Date(),
      size: action.order.size,
      price: action.order.price,
      side: action.order.side,
      stop_loss_price: action.order.stop_loss_price,
      take_profit_price: action.order.take_profit_price,
    } as Order;
    return this.tradingBoxService.postOrder(newOrder);
  }

  @Action(RemoveOrderAction)
  removeOrderAction(
    ctx: StateContext<OrdersStateModel>,
    action: RemoveOrderAction
  ) {
    return this.tradingBoxService.removeOrder(action.order);
  }

  @Action(CheckOrderAction)
  checkOrderAction(
    ctx: StateContext<OrdersStateModel>,
    action: CheckOrderAction
  ) {
    const unfilled = OrdersState.getOrders(ctx.getState());
    console.log({ unfilled });

    const filled = OrdersState.getFilledOrders(ctx.getState(), {
      price: Number(action.kline.close),
    } as MarketsStateModel);

    const checks = [];

    for (let uf of unfilled) {
      checks.push({
        symbol: uf.symbol,
        price: uf.stop_loss_price,
        side: uf.side,
        dateFrom: uf.latest_checked_date,
        order: uf,
      });
    }

    const flatten = filled.reduce((acc: any[], cur: Order) => {
      const closeSide = cur.side == Side.buy ? Side.sell : Side.buy;
      return [
        ...acc,
        {
          symbol: cur.symbol,
          price: cur.stop_loss_price,
          side: closeSide,
          dateFrom: cur.latest_checked_date,
          stopLoss: true,
          order: cur,
        },
        {
          symbol: cur.symbol,
          price: cur.take_profit_price,
          side: closeSide,
          dateFrom: cur.latest_checked_date,
          stopLoss: false,
          order: cur,
        },
      ];
    }, checks);

    return combineLatest(
      flatten.map((fla) =>
        checkFill(action.kline, fla.side, fla.price, fla.stopLoss).pipe(
          map((filledDate) => [filledDate as Date, fla.order as Order])
        )
      )
    ).pipe(
      switchMap((resp) =>
        combineLatest(
          resp.map((res) => {
            const [date, order] = res as [Date, Order];
            if (order.fill_date) {
              return this.tradingBoxService.postOrder({
                ...order,
                close_date: date,
              });
            }
            return this.tradingBoxService.postOrder({
              ...order,
              fill_date: date,
            });
          })
        )
      )
    );
  }
}
