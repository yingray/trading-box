/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFieldsValueItem } from './CustomFieldsValueItem';
import type { Message } from './Message';

export type OrderCommon = {
    /**
     * Unique identifier.
     */
    id: string;
    /**
     * Instrument name that is used on a broker's side.
     */
    instrument: string;
    /**
     * Quantity.
     */
    qty: number;
    /**
     * Side.
     */
    side: OrderCommon.side;
    /**
     * Type.
     */
    type: OrderCommon.type;
    /**
     * Filled quantity.
     */
    filledQty?: number;
    /**
     * Average price of order fills. It should be provided for filled / partly filled orders.
     *
     */
    avgPrice?: number;
    /**
     * Limit Price for Limit or StopLimit order.
     */
    limitPrice?: number;
    /**
     * Stop Price for Stop or StopLimit order.
     */
    stopPrice?: number;
    /**
     * Distance from the stop loss level to the current market price in pips for a position or to the order price if the parent is a stop or limit order.
     */
    trailingStopPips?: number;
    /**
     * If this flag is set to `true`, then the stop order is a trailing stop.
     */
    isTrailingStop?: boolean;
    /**
     * Identifier of a parent order or a parent position (for position brackets) depending on `parentType`.
     * Should be set only for bracket orders.
     *
     */
    parentId?: string;
    /**
     * Type of order's parent. Should be set only for bracket orders.
     */
    parentType?: OrderCommon.parentType;
    /**
     * Expiration type and Unix timestamp date/time.
     */
    duration?: {
        /**
         * Duration ID. Internal ID that you set in [/config](#operation/getConfiguration) response.
         */
        type: string;
        /**
         * Unix timestamp (UTC).
         */
        datetime?: number;
    };
    /**
     * Indicates the time when the order was last modified, Unix timestamp (UTC).
     */
    lastModified?: number;
    /**
     * Localized order custom fields values data.
     * Custom fields are configured in the [/config](#operation/getConfiguration) endpoint response.
     * Custom `Order dialog` fields are to be sent along with the standard fields in the order object.
     *
     */
    customFields?: Array<CustomFieldsValueItem>;
    message?: Message;
};

export namespace OrderCommon {

    /**
     * Side.
     */
    export enum side {
        BUY = 'buy',
        SELL = 'sell',
    }

    /**
     * Type.
     */
    export enum type {
        MARKET = 'market',
        STOP = 'stop',
        LIMIT = 'limit',
        STOPLIMIT = 'stoplimit',
    }

    /**
     * Type of order's parent. Should be set only for bracket orders.
     */
    export enum parentType {
        ORDER = 'order',
        POSITION = 'position',
    }


}

