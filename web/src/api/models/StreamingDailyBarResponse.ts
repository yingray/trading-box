/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StreamingDailyBarType } from './StreamingDailyBarType';

export type StreamingDailyBarResponse = (StreamingDailyBarType & {
    /**
     * Symbol
     */
    id: string;
    /**
     * Open.
     */
    'o': number;
    /**
     * High.
     */
    'h': number;
    /**
     * Low.
     */
    'l': number;
    /**
     * Close.
     */
    'c': number;
    /**
     * Volume.
     */
    'v': number;
    /**
     * Unix timestamp in seconds. Timestamp time should be always 00:00 at the start of the day.
     */
    't': number;
});

