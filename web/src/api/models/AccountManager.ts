/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountManagerTable } from './AccountManagerTable';

/**
 * Localized Account manager's tables configuration. Account manager is a
 * page in the bottom widget. This page can have multiple tables. Data of
 * the tables is filled using the [/state](/rest-api-spec/#operation/getState) endpoint.
 *
 */
export type AccountManager = Array<AccountManagerTable>;
