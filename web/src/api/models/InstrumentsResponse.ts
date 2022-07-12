/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Instrument } from './Instrument';
import type { OkStatus } from './OkStatus';

export type InstrumentsResponse = {
    's': OkStatus;
    'd': Array<Instrument>;
};

