/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomFieldsValueItem } from './CustomFieldsValueItem';
import type { Message } from './Message';

export type Position = {
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
    side: Position.side;
    /**
     * Average price of position trades.
     */
    avgPrice: number;
    /**
     * Unrealized (open) profit/loss.
     */
    unrealizedPl?: number;
    message?: Message;
    /**
     * Localized position custom fields values data.
     * Custom fields are configured in the [/config](#operation/getConfiguration) endpoint response.
     *
     */
    customFields?: Array<CustomFieldsValueItem>;
};

export namespace Position {

    /**
     * Side.
     */
    export enum side {
        BUY = 'buy',
        SELL = 'sell',
    }


}

