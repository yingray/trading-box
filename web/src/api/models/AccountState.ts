/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountState = {
    /**
     * Account Balance.
     */
    balance: number;
    /**
     * Unrealized profit/loss.
     */
    unrealizedPl: number;
    /**
     * Equity. If this field is not specified, then it is calculated as balance + unrealizedPl.
     */
    equity?: number;
    /**
     * Account manager data. Structure of Account manager is defined by the
     * [/config](#operation/getConfiguration) endpoint. Each element of this array is a table.
     *
     */
    amData?: Array<Array<Array<string>>>;
    /**
     * Account Summary Row data. Structure of Account Summary Row is defined by the
     * [/config](#operation/getConfiguration) endpoint.
     *
     */
    accountSummaryRowData?: Array<string>;
};

