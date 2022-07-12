/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Execution } from './Execution';
import type { OkStatus } from './OkStatus';

export type ExecutionsResponse = {
    's': OkStatus;
    'd': Array<Execution>;
};

