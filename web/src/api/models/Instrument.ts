/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LimitPercentValidationRule } from './LimitPercentValidationRule';
import type { OrderDialogCustomFields } from './OrderDialogCustomFields';
import type { StopLossPercentValidationRule } from './StopLossPercentValidationRule';
import type { StopPercentValidationRule } from './StopPercentValidationRule';
import type { SymbolType } from './SymbolType';
import type { TakeProfitPercentValidationRule } from './TakeProfitPercentValidationRule';

export type Instrument = {
    /**
     * Broker instrument name.
     */
    name: string;
    /**
     * Instrument description.
     */
    description: string;
    /**
     * Minimum quantity for trading. If `lotSize` is set, then the specified value must be in lots.
     */
    minQty?: number;
    /**
     * Maximum quantity for trading. If `lotSize` is set, then the specified value must be in lots.
     */
    maxQty?: number;
    /**
     * Quantity step. If `lotSize` is set, then the specified value must be in lots.
     */
    qtyStep?: number;
    /**
     * Size of 1 pip.
     * It is equal to `minTick` for non-forex symbols. For forex pairs it equals either the `minTick`,
     * or the `minTick` multiplied by `10`. For example, for IBM `minTick` it is 0.01, for EURCAD `minTick` it is 0.00001.
     *
     */
    pipSize: number;
    /**
     * Value of 1 pip in the account currency.
     *
     */
    pipValue: number;
    /**
     * Minimum price movement. For example, for IBM `minTick` is 0.01, for EURCAD `minTick` is 0.00001.
     */
    minTick: number;
    /**
     * Financial instrument units standardized number as set by the exchange or broker for buying or selling.
     */
    lotSize?: number;
    /**
     * The first currency quoted in a currency pair. Used for crypto currencies only.
     */
    baseCurrency?: string;
    /**
     * A quote currency is the second currency quoted in a currency pair. Used for crypto currencies only.
     *
     */
    quoteCurrency?: string;
    /**
     * Margin rate for this instrument.
     */
    marginRate?: number;
    /**
     * Indicates if your API provides quotes for this instrument. Assigning `false` to this field prevents `/quotes` request and makes ask/bid displayed from a TradingView server depending on users data subscriptions on TradingView. Use of this flag must be agreed with TradingView
     */
    hasQuotes?: boolean;
    /**
     * Units of quantity or amount. Displayed instead of the `Units` label in the Quantity/Amount field
     */
    units?: string;
    type: SymbolType;
    /**
     * Order dialog configuration for the symbol. It will override configuration,
     * specified in the [/accounts](#operation/getAccounts) endpoint.
     *
     */
    ui?: {
        orderDialogCustomFields?: OrderDialogCustomFields;
        /**
         * Rules applied to field validation in the Order dialog.
         * Please note: `stopPercent` and `limitPercent` validation rules are not applied if the `supportStopOrdersInBothDirections` flag is set to true.
         *
         */
        validationRules?: Array<(StopPercentValidationRule | LimitPercentValidationRule | StopLossPercentValidationRule | TakeProfitPercentValidationRule)>;
    };
};

