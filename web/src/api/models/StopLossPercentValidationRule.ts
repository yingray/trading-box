/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Stop Loss Percent Price Range Rule applied to field validation in the Order dialog.
 */
export type StopLossPercentValidationRule = {
    id: StopLossPercentValidationRule.id;
    options: {
        /**
         * Minimal value in percentage of the stop loss price relative to the parent order price.
         */
        min: number;
        /**
         * Maximum value in percentage of the stop loss price relative to the parent order price.
         */
        max: number;
    };
};

export namespace StopLossPercentValidationRule {

    export enum id {
        SL_PERCENT = 'slPercent',
    }


}

