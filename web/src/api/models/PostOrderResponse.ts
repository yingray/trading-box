/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OkStatus } from './OkStatus';

export type PostOrderResponse = {
    's': OkStatus;
    'd': {
        /**
         * New order identifier.
         */
        orderId?: string;
    };
};

