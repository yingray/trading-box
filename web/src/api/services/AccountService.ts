/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AccountResponse } from '../models/AccountResponse';
import type { AccountStateResponse } from '../models/AccountStateResponse';
import type { CryptoBalancesResponse } from '../models/CryptoBalancesResponse';
import type { ErrorResponse } from '../models/ErrorResponse';
import type { ExecutionsResponse } from '../models/ExecutionsResponse';
import type { GetLeverageResponse } from '../models/GetLeverageResponse';
import type { InstrumentsResponse } from '../models/InstrumentsResponse';
import type { Locale } from '../models/Locale';
import type { OrdersHistoryResponse } from '../models/OrdersHistoryResponse';
import type { OrdersResponse } from '../models/OrdersResponse';
import type { PositionsResponse } from '../models/PositionsResponse';
import type { PreviewLeverageResponse } from '../models/PreviewLeverageResponse';
import type { SetLeverageResponse } from '../models/SetLeverageResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class AccountService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Accounts
     * Get a list of accounts owned by the user.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getAccounts(
        locale: Locale,
    ): Observable<(AccountResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts',
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Instruments
     * Get the list of the instruments that are available for trading with the specified account.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getInstruments(
        accountId: string,
        locale: Locale,
    ): Observable<(InstrumentsResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/instruments',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * State
     * Get account information.
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getState(
        accountId: string,
        locale: Locale,
    ): Observable<(AccountStateResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/state',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Orders
     * Get current session orders for the account. It also includes working orders from previous sessions.
     * Filled/cancelled/rejected orders should be included in the list till the end of the session.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getOrders(
        accountId: string,
        locale: Locale,
    ): Observable<(OrdersResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/orders',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Positions
     * Get positions for an account.
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getPositions(
        accountId: string,
        locale: Locale,
    ): Observable<(PositionsResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/positions',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Balances
     * Get crypto balances for an account.
     * Balances are displayed as the first table of the Account Summary tab.
     * Used for crypto currencies only.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getBalances(
        accountId: string,
        locale: Locale,
    ): Observable<(CryptoBalancesResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/balances',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Executions
     * Get a list of executions (i.e. fills or trades) for an account and an
     * instrument. Executions are displayed on a chart.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param instrument Broker instrument name.
     * @param maxCount Maximum count of executions to return.
     * @returns any response
     * @throws ApiError
     */
    public getExecutions(
        accountId: string,
        locale: Locale,
        instrument: string,
        maxCount?: number,
    ): Observable<(ExecutionsResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/executions',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
                'instrument': instrument,
                'maxCount': maxCount,
            },
        });
    }

    /**
     * Orders History
     * Get order history for an account. It is expected that returned orders will have a final status (`rejected`,
     * `filled`, `cancelled`). This endpoint is optional. If you don't support orders history, please set
     * the `supportOrdersHistory` flag to `false`.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param maxCount Maximum count of orders to return.
     * @returns any response
     * @throws ApiError
     */
    public getOrdersHistory(
        accountId: string,
        locale: Locale,
        maxCount?: number,
    ): Observable<(OrdersHistoryResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/accounts/{accountId}/ordersHistory',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
                'maxCount': maxCount,
            },
        });
    }

    /**
     * Get Leverage
     * Request to this endpoint will be sent when the user opens the order ticket or changes any of the symbol, order type, side and any of the custom fields in the order ticket.
     * Custom `Order dialog` fields defined in the [/accounts](#operation/getAccounts) are sent along with the standard fields in the order object.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public getLeverage(
        accountId: string,
        locale: Locale,
        formData?: {
            /**
             * Broker instrument name.
             */
            instrument: string;
            /**
             * Current order side in the order ticket.
             */
            side: 'buy' | 'sell';
            /**
             * Current order type selected in the order ticket.
             */
            orderType: 'market' | 'stop' | 'limit' | 'stoplimit';
        },
    ): Observable<(GetLeverageResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/accounts/{accountId}/getLeverage',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * Set Leverage
     * Will be sent when the user confirms changing the leverage.
     * Additional "leverage" field will be added to the payload, the value of which was set by the user.
     * Custom `Order dialog` fields defined in the [/accounts](#operation/getAccounts) are sent along with the standard fields in the order object.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public setLeverage(
        accountId: string,
        locale: Locale,
        formData: {
            /**
             * Broker instrument name.
             */
            instrument: string;
            /**
             * Current order side in the order ticket.
             */
            side: 'buy' | 'sell';
            /**
             * Current order type selected in the order ticket.
             */
            orderType: 'market' | 'stop' | 'limit' | 'stoplimit';
            /**
             * Leverage value set by the user
             */
            leverage: number;
        },
    ): Observable<(SetLeverageResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/accounts/{accountId}/setLeverage',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * Preview Leverage
     * Will be sent when the user is editing the leverage.
     * Custom `Order dialog` fields defined in the [/accounts](#operation/getAccounts) are sent along with the standard fields in the order object.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public previewLeverage(
        accountId: string,
        locale: Locale,
        formData?: {
            /**
             * Broker instrument name.
             */
            instrument: string;
            /**
             * Current order side in the order ticket.
             */
            side: 'buy' | 'sell';
            /**
             * Current order type selected in the order ticket.
             */
            orderType: 'market' | 'stop' | 'limit' | 'stoplimit';
            /**
             * Leverage value set by user
             */
            leverage: number;
        },
    ): Observable<(PreviewLeverageResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/accounts/{accountId}/previewLeverage',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

}
