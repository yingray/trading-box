import { Order } from 'src/app/shared/models/order.model';

export class GetOrdersAction {
  static readonly type = '[Orders] getOrders';
  constructor() {}
}

export class PostOrderAction {
  static readonly type = '[Orders] postOrder';
  constructor(public order: Order) {}
}

export class RemoveOrderAction {
  static readonly type = '[Orders] removeOrder';
  constructor(public order: Order) {}
}
