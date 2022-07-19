import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Order, Side } from '../../models/order.model';
import { OrdersState } from '../order-list/state/orders.state';

@Component({
  selector: 'app-closed-position-list',
  templateUrl: './closed-position-list.component.html',
  styleUrls: ['./closed-position-list.component.scss'],
})
export class ClosedPositionListComponent implements OnInit {
  Side = Side;

  @Select(OrdersState.getClosedPositions) orders$!: Observable<Order[]>;

  constructor() {}

  ngOnInit(): void {}
}
