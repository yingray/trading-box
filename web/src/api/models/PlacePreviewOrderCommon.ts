/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PlacePreviewOrderCommon = {
    /**
     * Instrument.
     */
    instrument?: string;
    /**
     * Side.
     */
    side?: PlacePreviewOrderCommon.side;
    /**
     * Type.
     */
    type?: PlacePreviewOrderCommon.type;
};

export namespace PlacePreviewOrderCommon {

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


}

