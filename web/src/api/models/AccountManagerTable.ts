/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountManagerColumn } from './AccountManagerColumn';

export type AccountManagerTable = {
    id: string;
    /**
     * Localized title of a table.
     */
    title?: string;
    columns: Array<AccountManagerColumn>;
};

