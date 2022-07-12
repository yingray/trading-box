/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OkStatus } from './OkStatus';
import type { Position } from './Position';

export type PositionsResponse = {
    's': OkStatus;
    'd': Array<Position>;
};

