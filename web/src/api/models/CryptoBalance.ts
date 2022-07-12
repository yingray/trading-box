/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CryptoBalance = {
    /**
     * Crypto currency symbol.
     */
    symbol: string;
    /**
     * Crypto currency name.
     */
    longName?: string;
    /**
     * Total amount of the balance.
     */
    total: number;
    /**
     * The balance available to the user.
     */
    available: number;
    /**
     * Reserved balance amount that can't be used at the moment for any reasons.
     */
    reserved?: number;
    /**
     * Total balance amount in BTC.
     */
    btcValue?: number;
    /**
     * Balance amount in additional currency.
     */
    value?: number;
    /**
     * Currency of the value. It can be either code, or symbol.
     */
    valueCurrency?: string;
};

