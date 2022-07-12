/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OkStatus } from './OkStatus';
import type { OrderHistory } from './OrderHistory';

export type OrdersHistoryResponse = {
    's': OkStatus;
    'd': Array<OrderHistory>;
};

