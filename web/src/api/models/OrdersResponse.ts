/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OkStatus } from './OkStatus';
import type { Order } from './Order';

export type OrdersResponse = {
    's': OkStatus;
    'd': Array<Order>;
};

