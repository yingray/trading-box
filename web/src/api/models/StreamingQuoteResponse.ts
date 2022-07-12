/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StreamingQuoteResponse = {
    /**
     * Should always be `q`.
     */
    'f': string;
    /**
     * Symbol.
     */
    id: string;
    /**
     * Unix time UTC.
     */
    't': number;
    /**
     * Best ask price.
     */
    ap: number;
    /**
     * Best ask size.
     */
    as: number;
    /**
     * Best bid price.
     */
    bp: number;
    /**
     * Best bid size.
     */
    bs: number;
};

