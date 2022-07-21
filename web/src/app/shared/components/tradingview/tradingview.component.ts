import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    TradingView: any;
  }
}

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.scss'],
})
export class TradingviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const TradingView = window.TradingView;
    new TradingView.widget({
      autosize: true,
      symbol: 'BYBIT:ETHUSDT',
      interval: '60',
      timezone: 'Asia/Taipei',
      theme: 'dark',
      style: '1',
      locale: 'zh_TW',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      allow_symbol_change: true,
      save_image: false,
      container_id: 'tradingview_a6ac8',
    });
  }
}
