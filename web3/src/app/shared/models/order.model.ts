export enum Side {
  buy = 'buy',
  sell = 'sell',
}

export enum CloseType {
  success = 'success',
  fail = 'fail',
}

export type Order = {
  symbol: string;
  post_date: Date;
  size: number;
  price: number;
  side: Side;
  latest_checked_date?: Date;
  fill_date?: Date;
  stop_loss_price?: number;
  take_profit_price?: number;
  close_date?: Date;
  close_type?: CloseType;
};

export type Position = {
  pnl: string;
  pnlr: string;
  market_price: number;
  order: Order;
};
