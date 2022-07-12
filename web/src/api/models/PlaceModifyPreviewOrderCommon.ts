/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PlaceModifyPreviewOrderCommon = {
    /**
     * The number of units.
     */
    qty?: number;
    /**
     * Limit Price for Limit or StopLimit order.
     */
    limitPrice?: number;
    /**
     * Stop Price for Stop or StopLimit order.
     */
    stopPrice?: number;
    /**
     * Duration ID (if supported).
     */
    durationType?: string;
    /**
     * Expiration datetime Unix timestamp (if supported by duration type).
     */
    durationDateTime?: number;
    /**
     * StopLoss price (if supported).
     */
    stopLoss?: number;
    /**
     * Distance from the stop loss level to the current market price in pips (if supported by the broker).
     */
    trailingStopPips?: number;
    /**
     * TakeProfit price (if supported).
     */
    takeProfit?: number;
    /**
     * Digital signature (if supported).
     */
    digitalSignature?: string;
    /**
     * Current ask price for the instrument that the user sees in the order panel.
     */
    currentAsk?: number;
    /**
     * Current bid price for the instrument that the user sees in the order panel.
     */
    currentBid?: number;
};

