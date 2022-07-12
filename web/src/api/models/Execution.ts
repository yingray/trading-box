/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Execution = {
    /**
     * Unique identifier.
     */
    id: string;
    /**
     * Instrument id.
     */
    instrument: string;
    /**
     * Execution price.
     */
    price: number;
    /**
     * Execution time, Unix timestamp (UTC).
     */
    time: number;
    /**
     * Execution quantity.
     */
    qty: number;
    /**
     * Side.
     */
    side: Execution.side;
    /**
     * Identifier of the order that has been filled.
     */
    orderId: string;
    /**
     * Whether the execution reduces the position.
     */
    isClose: boolean;
    /**
     * Identifier of the position that has been opened, modified or closed.
     */
    positionId?: string;
    /**
     * Commission charged for the fill.
     */
    commission?: number;
};

export namespace Execution {

    /**
     * Side.
     */
    export enum side {
        BUY = 'buy',
        SELL = 'sell',
    }


}

