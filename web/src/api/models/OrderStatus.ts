/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderStatus = {
    /**
     * String constants to describe an order status.
     *
     * `Status`  | Description
     * ----------|-------------
     * placing   | order is not created on a broker's side yet
     * inactive  | bracket order is created but waiting for a base order to be filled
     * working   | order is created but not fully executed yet
     * rejected  | order is rejected for some reason
     * filled    | order is fully executed
     * cancelled  | order is cancelled
     *
     */
    status: OrderStatus.status;
};

export namespace OrderStatus {

    /**
     * String constants to describe an order status.
     *
     * `Status`  | Description
     * ----------|-------------
     * placing   | order is not created on a broker's side yet
     * inactive  | bracket order is created but waiting for a base order to be filled
     * working   | order is created but not fully executed yet
     * rejected  | order is rejected for some reason
     * filled    | order is fully executed
     * cancelled  | order is cancelled
     *
     */
    export enum status {
        PLACING = 'placing',
        INACTIVE = 'inactive',
        WORKING = 'working',
        REJECTED = 'rejected',
        FILLED = 'filled',
        CANCELLED = 'cancelled',
    }


}

