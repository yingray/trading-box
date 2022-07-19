import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTradingRecordAction } from './shared/components/markets/state/markets.actions';
import { GetOrdersAction } from './shared/components/order-list/state/orders.actions';
import { OrdersState } from './shared/components/order-list/state/orders.state';
import { CountForTabs } from './shared/models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'trading-box';

  @Select(OrdersState.getCountForTabs) countForTabs$!: Observable<CountForTabs>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTradingRecordAction('ETHUSD'));
    this.store.dispatch(new GetOrdersAction());
  }
}
