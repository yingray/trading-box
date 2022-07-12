/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Ask or Bid.
 */
export type StreamingAskBidTradeItem = {
    /**
     * Symbol
     */
    id: string;
    /**
     * Price.
     */
    'p': number;
    /**
     * Size.
     */
    's'?: number;
    /**
     * Unix time UTC.
     */
    't': number;
};

