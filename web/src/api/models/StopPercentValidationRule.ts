/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Stop Percent Price Range Rule applied to the order price field validation in the Order dialog.
 */
export type StopPercentValidationRule = {
    id: StopPercentValidationRule.id;
    options: {
        /**
         * Minimal value in percentage of the stop price relative to the current price.
         *
         */
        min: number;
        /**
         * Maximum value in percentage of the stop price relative to the current price.
         *
         */
        max: number;
    };
};

export namespace StopPercentValidationRule {

    export enum id {
        STOP_PERCENT = 'stopPercent',
    }


}

