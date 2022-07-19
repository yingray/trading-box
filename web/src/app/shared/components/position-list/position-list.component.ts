import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { TradingBoxService } from 'src/app/core/services/trading-box/trading-box.service';
import { Order, Side } from '../../models/order.model';
import { OrdersState } from '../order-list/state/orders.state';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
})
export class PositionListComponent implements OnInit {
  Side = Side;

  @Select(OrdersState.getPositions) orders$!: Observable<Order[]>;

  constructor() {}

  ngOnInit(): void {}
}
