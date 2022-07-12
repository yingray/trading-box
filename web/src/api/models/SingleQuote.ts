/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Price and restriction data for an instrument.
 */
export type SingleQuote = {
    /**
     * Ask price.
     */
    ask: number;
    /**
     * Bid price.
     */
    bid: number;
    /**
     * Value of 1 pip in the account currency, used for calculating risks and trade value in the Order dialog for buy orders.
     */
    buyPipValue?: number;
    /**
     * Value of 1 pip in the account currency, used for calculating risks and trade value in the Order dialog for sell orders.
     */
    sellPipValue?: number;
    /**
     * Specify if the instrument is hard to borrow.
     */
    hardToBorrow?: boolean;
    /**
     * Specify if the instrument is not shortable.
     */
    notShortable?: boolean;
    /**
     * Specify if the instrument is halted.
     */
    halted?: boolean;
};

