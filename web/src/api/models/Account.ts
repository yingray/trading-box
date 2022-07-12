/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountDurations } from './AccountDurations';
import type { AccountFlags } from './AccountFlags';
import type { AccountManager } from './AccountManager';
import type { AccountSummaryRow } from './AccountSummaryRow';
import type { OrderCustomFields } from './OrderCustomFields';
import type { OrderDialogCustomFields } from './OrderDialogCustomFields';
import type { OrderHistoryCustomFields } from './OrderHistoryCustomFields';
import type { PositionCustomFields } from './PositionCustomFields';

export type Account = {
    /**
     * Unique account identifier.
     */
    id: string;
    /**
     * Account title that is displayed to a user.
     */
    name: string;
    /**
     * Account type
     */
    type: Account.type;
    /**
     * Abbreviation of account currency.
     */
    currency?: string;
    /**
     * Account currency symbol.
     */
    currencySign?: string;
    config: AccountFlags;
    /**
     * Account manager and Order dialog configuration for the account.
     * The Account manager configuration will override configuration, specified in the [/config](#operation/getConfiguration) endpoint.
     *
     */
    ui?: {
        accountSummaryRow?: AccountSummaryRow;
        accountManager?: AccountManager;
        orderCustomFields?: OrderCustomFields;
        orderHistoryCustomFields?: OrderHistoryCustomFields;
        positionCustomFields?: PositionCustomFields;
        orderDialogCustomFields?: OrderDialogCustomFields;
    };
    durations?: AccountDurations;
    /**
     * Prefix for instruments.
     */
    prefix?: string;
    /**
     * Used to confirm that the account has been verified (for example, KYC is passed). Only verified account users can leave reviews in the broker profile.
     */
    isVerified?: boolean;
};

export namespace Account {

    /**
     * Account type
     */
    export enum type {
        LIVE = 'live',
        DEMO = 'demo',
    }


}

