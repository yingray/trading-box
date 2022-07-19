export type WsResponse = {
  topic: string;
  data: any;
  type?: string;
};

export enum WsTopic {
  trade = 'trade',
  orderbook = 'orderBookL2_25',
}

export type KLine = {
  close: string;
  high: string;
  interval: string;
  low: string;
  open: string;
  open_time: number;
  symbol: string;
  turnover: string;
  volume: string;
};

export type KLineMap = {
  [bybit_open_time: number]: KLine;
};

export type TradeRecordResponse = {
  result: TradeRecord[];
};

export type TradeRecord = {
  symbol: string;
  price: number;

  // cross_seq: 9370562099
  // price: 1529.2
  // side: "Buy"
  // size: 1753
  // symbol: "ETHUSD"
  // tick_direction: "PlusTick"
  // timestamp: "2022-07-19T06:01:10.000Z"
  // trade_id: "063c60e4-dcd3-516a-8a09-7aa872818969"
  // trade_time_ms: 1658210470664
};

export type OrderbookItem = {
  id: number;
  price: string;
  symbol: string;
  side: string; // Buy, Sell
  size: number;
};
