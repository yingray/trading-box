import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, of } from 'rxjs';
import { TradingBoxService } from 'src/app/core/services/trading-box/trading-box.service';
import { Order, Side } from '../../models/order.model';
import { GetOrdersAction, RemoveOrderAction } from './state/orders.actions';
import { OrdersState } from './state/orders.state';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  Side = Side;

  @Select(OrdersState.getOrders) orders$!: Observable<Order[]>;

  constructor(
    private store: Store,
    private modal: NzModalService,
    private tradingBoxService: TradingBoxService
  ) {}

  ngOnInit(): void {}

  removeClick(order: Order): void {
    this.modal.info({
      nzTitle: '訂單確認',
      nzContent: `您確定要刪除此訂單嗎？`,
      nzOnOk: () => {
        this.store.dispatch(new RemoveOrderAction(order)).subscribe(() => {
          this.store.dispatch(new GetOrdersAction());
        });
      },
    });
  }
}
