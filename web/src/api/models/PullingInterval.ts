/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Time intervals in milliseconds to pull data from the server.
 */
export type PullingInterval = {
    /**
     * Time interval in milliseconds to request quote and level 2 depth updates.
     */
    quotes?: number;
    /**
     * Time interval in milliseconds to request orders.
     */
    orders?: number;
    /**
     * Time interval in milliseconds to request positions.
     */
    positions?: number;
    /**
     * Time interval in milliseconds to update Account manager tables.
     */
    accountManager?: number;
    /**
     * Time interval in milliseconds to request balances.
     */
    balances?: number;
};

