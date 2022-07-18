import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TradingBoxService } from 'src/app/core/services/trading-box/trading-box.service';
import { Order, Side } from '../../models/order.model';

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

  orders$: Observable<Order[]>;

  constructor(private tradingBoxService: TradingBoxService) {
    this.orders$ = tradingBoxService.getAllOrdersWithCheck();
  }

  ngOnInit(): void {}
}
