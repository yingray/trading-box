/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SingleField } from './SingleField';
import type { SingleMapping } from './SingleMapping';

/**
 * Map of Broker instrument names and TradingView instrument names.
 */
export type SymbolMapping = {
    symbols?: Array<SingleMapping>;
    /**
     * Array with the only one element `['brokerSymbol']`.
     */
    fields?: Array<SingleField>;
};

