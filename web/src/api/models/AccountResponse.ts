/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Account } from './Account';
import type { OkStatus } from './OkStatus';

export type AccountResponse = {
    's': OkStatus;
    'd': Array<Account>;
};

