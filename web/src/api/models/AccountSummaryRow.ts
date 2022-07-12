/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountSummaryRowItem } from './AccountSummaryRowItem';

/**
 * Localized Account Summary Row configuration.
 * Account Summary Row is a panel at the top of the bottom widget with the key account indicators. The `supportCustomAccountSummaryRow` flag should be enabled in the account config, see the [/accounts](#operation/getAccounts) endpoint. Data of the Account Summary Row is filled using the [/state](/rest-api-spec/#operation/getState) endpoint.
 */
export type AccountSummaryRow = Array<AccountSummaryRowItem>;
