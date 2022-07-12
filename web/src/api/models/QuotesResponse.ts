/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OkStatus } from './OkStatus';
import type { SingleQuote } from './SingleQuote';
import type { Status } from './Status';

export type QuotesResponse = {
    's': OkStatus;
    'd': Array<{
        's': Status;
        /**
         * Symbol name. Should be equal to the requested one.
         */
        'n': string;
        'v': SingleQuote;
    }>;
};

