/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderHistoryStatus = {
    /**
     * String constants to describe a final order status.
     *
     * `Status`  | Description
     * ----------|-------------
     * rejected  | order is rejected for some reason
     * filled    | order is fully executed
     * cancelled  | order is cancelled
     *
     */
    status: OrderHistoryStatus.status;
};

export namespace OrderHistoryStatus {

    /**
     * String constants to describe a final order status.
     *
     * `Status`  | Description
     * ----------|-------------
     * rejected  | order is rejected for some reason
     * filled    | order is fully executed
     * cancelled  | order is cancelled
     *
     */
    export enum status {
        REJECTED = 'rejected',
        FILLED = 'filled',
        CANCELLED = 'cancelled',
    }


}

