import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { TradingBoxService } from 'src/app/core/services/trading-box/trading-box.service';
import { Order, Side } from '../../models/order.model';
import { OrdersState } from './state/orders.state';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  Side = Side;

  @Select(OrdersState.getOrders) orders$!: Observable<Order[]>;

  constructor() {}

  ngOnInit(): void {}
}
