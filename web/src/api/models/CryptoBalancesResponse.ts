/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CryptoBalance } from './CryptoBalance';
import type { OkStatus } from './OkStatus';

export type CryptoBalancesResponse = {
    's': OkStatus;
    'd': Array<CryptoBalance>;
};

