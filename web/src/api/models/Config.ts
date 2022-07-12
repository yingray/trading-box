/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountManager } from './AccountManager';
import type { AccountSummaryRow } from './AccountSummaryRow';
import type { Durations } from './Durations';
import type { OrderCustomFields } from './OrderCustomFields';
import type { OrderHistoryCustomFields } from './OrderHistoryCustomFields';
import type { PositionCustomFields } from './PositionCustomFields';
import type { PullingInterval } from './PullingInterval';

export type Config = {
    accountSummaryRow?: AccountSummaryRow;
    accountManager?: AccountManager;
    durations?: Durations;
    orderCustomFields?: OrderCustomFields;
    orderHistoryCustomFields?: OrderHistoryCustomFields;
    positionCustomFields?: PositionCustomFields;
    pullingInterval?: PullingInterval;
};

