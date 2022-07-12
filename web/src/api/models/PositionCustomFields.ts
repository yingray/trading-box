/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountManagerColumn } from './AccountManagerColumn';

/**
 * Additional position columns to be displayed in the positions table of the Account manager.
 * The positions table has a default set of columns that can be extended using this configuration.
 * The `supportPositionCustomFields` flag should be enabled in the [account configuration](https://www.tradingview.com/rest-api-spec/#operation/getAccounts).
 * Data of the additional fields is filled from the
 * [/positions](https://www.tradingview.com/rest-api-spec/#operation/getPositions) `customFields` value.
 *
 */
export type PositionCustomFields = Array<AccountManagerColumn>;
