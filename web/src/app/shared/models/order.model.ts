export enum Side {
  buy = 'buy',
  sell = 'sell',
}

export type Order = {
  symbol: string;
  post_date: Date;
  size: number;
  price: number;
  side: Side;
  fill_date?: Date;
  stop_loss_price?: number;
  take_profit_price?: number;
};
