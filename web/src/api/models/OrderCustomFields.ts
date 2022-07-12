/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountManagerColumn } from './AccountManagerColumn';

/**
 * Additional order columns to be displayed in the orders table of the Account manager.
 * The orders table has a default set of columns that can be extended using this configuration.
 * The `supportOrderCustomFields` flag should be enabled in the [account configuration](https://www.tradingview.com/rest-api-spec/#operation/getAccounts).
 * Data of the additional fields is filled from the
 * [/orders](https://www.tradingview.com/rest-api-spec/#operation/getOrders) `customFields` value.
 *
 */
export type OrderCustomFields = Array<AccountManagerColumn>;
