import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderbookItem } from '../../models/kline.model';
import {
  MarketsState,
  MarketsStateModel,
} from '../markets/state/markets.state';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss'],
})
export class OrderbookComponent implements OnInit {
  @Select(MarketsState.getMarkets) market$!: Observable<MarketsStateModel>;
  @Select(MarketsState.getSellOrderbook) sellOrderbook$!: Observable<
    OrderbookItem[]
  >;
  @Select(MarketsState.getBuyOrderbook) buyOrderbook$!: Observable<
    OrderbookItem[]
  >;

  constructor() {}

  ngOnInit(): void {}
}
