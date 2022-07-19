import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Side } from '../../models/order.model';
import {
  MarketsState,
  MarketsStateModel,
} from '../markets/state/markets.state';
import {
  GetOrdersAction,
  PostOrderAction,
} from '../order-list/state/orders.actions';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  Side = Side;
  orderTypes = [{ label: '限價單', value: 0 }];

  formGroup: FormGroup;
  @Select(MarketsState) market$!: Observable<MarketsStateModel>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modal: NzModalService
  ) {
    this.formGroup = fb.group({
      order_type: [0],
      price: [1000, Validators.required],
      size: [1, Validators.required],
      take_profit_price: [1, Validators.required],
      stop_loss_price: [1, Validators.required],
    });
  }

  get totalPrice(): number {
    const value = this.formGroup.value;
    return value.size * value.price;
  }

  ngOnInit(): void {
    this.market$.subscribe((market) => {
      this.formGroup.patchValue({
        price: market.price,
        take_profit_price: Math.round(market.price * 1.08),
        stop_loss_price: Math.round(market.price * 0.98),
      });
    });
  }

  showModal(side: Side): void {
    const value = this.formGroup.value;

    if (
      (side === Side.buy && value.stop_loss_price > value.take_profit_price) ||
      (side === Side.sell && value.stop_loss_price < value.take_profit_price)
    ) {
    }

    this.modal.info({
      nzTitle: '訂單確認',
      nzContent: `您確定要為此 ${value.size} ETH 訂單設置一個價值 ${
        value.price
      } 做${side === Side.buy ? '多' : '空'}訂單嗎？`,
      nzOnOk: this.postOrder.bind(this, side),
    });
  }

  postOrder(side: Side): void {
    const value = this.formGroup.value;

    // keep take_profie price correctly with trading side
    let stop_loss_price = value.stop_loss_price;
    let take_profit_price = value.take_profit_price;
    if (
      (side === Side.buy && stop_loss_price > take_profit_price) ||
      (side === Side.sell && take_profit_price > stop_loss_price)
    ) {
      stop_loss_price = [
        take_profit_price,
        (take_profit_price = stop_loss_price),
      ][0];
    }

    this.store
      .dispatch(
        new PostOrderAction({
          ...this.formGroup.value,
          stop_loss_price,
          take_profit_price,
          side,
        })
      )
      .subscribe(() => {
        // refresh order state
        this.store.dispatch(new GetOrdersAction());
      });
  }
}
