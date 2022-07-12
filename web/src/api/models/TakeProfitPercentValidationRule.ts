/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Take Profit Percent Price Range Rule applied to field validation in the Order dialog.
 */
export type TakeProfitPercentValidationRule = {
    id: TakeProfitPercentValidationRule.id;
    options: {
        /**
         * Minimal value in percentage of the take profit price relative to the parent order price.
         */
        min: number;
        /**
         * Maximum value in percentage of the take profit price relative to the parent order price.
         */
        max: number;
    };
};

export namespace TakeProfitPercentValidationRule {

    export enum id {
        TP_PERCENT = 'tpPercent',
    }


}

