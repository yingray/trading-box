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
