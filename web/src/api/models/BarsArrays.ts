/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Bars data.
 */
export type BarsArrays = {
    /**
     * Bar time, Unix timestamp (UTC). Daily bars should only have the date
     * part, time should be 0.
     *
     */
    't': Array<number>;
    /**
     * Open price.
     */
    'o': Array<number>;
    /**
     * High price.
     */
    'h': Array<number>;
    /**
     * Low price.
     */
    'l': Array<number>;
    /**
     * Close price.
     */
    'c': Array<number>;
    /**
     * Volume.
     */
    'v': Array<number>;
};

