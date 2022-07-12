/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderCommon } from './OrderCommon';
import type { OrderStatus } from './OrderStatus';

export type Order = (OrderCommon & OrderStatus);

