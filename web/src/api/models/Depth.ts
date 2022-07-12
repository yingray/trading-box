/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DepthItem } from './DepthItem';

/**
 * Depth of market for an instrument.
 */
export type Depth = {
    /**
     * Array of arrays with two numeric elements - price and volume. Must be sorted by `price` in ascending order.
     */
    asks: Array<DepthItem>;
    /**
     * Array of arrays with two numeric elements - price and volume. Must be sorted by `price` in ascending order.
     */
    bids: Array<DepthItem>;
};

