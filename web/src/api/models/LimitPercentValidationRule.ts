/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Limit Percent Price Range Rule applied to the order price field validation in the Order dialog.
 */
export type LimitPercentValidationRule = {
    id: LimitPercentValidationRule.id;
    options: {
        /**
         * Minimal value in percentage of the limit price relative to the current price.
         */
        min: number;
        /**
         * Maximum value in percentage of the limit price relative to the current price.
         */
        max: number;
    };
};

export namespace LimitPercentValidationRule {

    export enum id {
        LIMIT_PERCENT = 'limitPercent',
    }


}

