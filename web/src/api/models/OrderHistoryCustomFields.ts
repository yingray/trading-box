/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountManagerColumn } from './AccountManagerColumn';

/**
 * Additional history columns to be displayed in the history table of the Account manager.
 * The history table has a default set of columns that can be extended using this configuration.
 * The `supportOrderHistoryCustomFields` and `supportOrdersHistory` flags should be enabled in the [account configuration](https://www.tradingview.com/rest-api-spec/#operation/getAccounts).
 * Data of the additional fields is filled from the
 * [/ordersHistory](/rest-api-spec/#operation/getOrdersHistory) `customFields` value.
 *
 */
export type OrderHistoryCustomFields = Array<AccountManagerColumn>;
