/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { ErrorResponse } from '../models/ErrorResponse';
import type { Locale } from '../models/Locale';
import type { PlaceModifyPreviewOrderCommon } from '../models/PlaceModifyPreviewOrderCommon';
import type { PlacePreviewOrderCommon } from '../models/PlacePreviewOrderCommon';
import type { PostOrderResponse } from '../models/PostOrderResponse';
import type { PreviewOrderResponse } from '../models/PreviewOrderResponse';
import type { SuccessResponse } from '../models/SuccessResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class TradingService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Place Order
     * Place a new order. Custom `Order dialog` fields defined in the [/accounts](#operation/getAccounts) are sent along with the standard fields in the order object.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @param requestId Unique identifier for a request.
     * @param confirmId Identifier of an order received in the preview order request.
     * @returns any response
     * @throws ApiError
     */
    public placeOrder(
        accountId: string,
        locale: Locale,
        formData: (PlacePreviewOrderCommon & PlaceModifyPreviewOrderCommon & {
            /**
             * Instrument.
             */
            instrument: string;
            /**
             * Side.
             */
            side: 'buy' | 'sell';
            /**
             * Type.
             */
            type: 'market' | 'stop' | 'limit' | 'stoplimit';
            /**
             * The number of units.
             */
            qty: number;
            /**
             * Current ask price for the instrument that the user sees in the order panel.
             */
            currentAsk: number;
            /**
             * Current bid price for the instrument that the user sees in the order panel.
             */
            currentBid: number;
        }),
        requestId?: string,
        confirmId?: string,
    ): Observable<(PostOrderResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/accounts/{accountId}/orders',
            path: {
                'accountId': accountId,
            },
            query: {
                'locale': locale,
                'requestId': requestId,
                'confirmId': confirmId,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * Modify Order
     * Modify an existing order. Custom `Order dialog` fields defined in the [/accounts](#operation/getAccounts) are sent along with the standard fields in the order object.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @param confirmId Identifier of an order received in the preview order request.
     * @returns any response
     * @throws ApiError
     */
    public modifyOrder(
        accountId: string,
        orderId: string,
        locale: Locale,
        formData: (PlaceModifyPreviewOrderCommon & {
            /**
             * The number of units.
             */
            qty: number;
        }),
        confirmId?: string,
    ): Observable<(SuccessResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/accounts/{accountId}/orders/{orderId}',
            path: {
                'accountId': accountId,
                'orderId': orderId,
            },
            query: {
                'locale': locale,
                'confirmId': confirmId,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * Cancel Order
     * Cancel an existing order.
     * @param accountId Account identifier.
     * @param orderId Order identifier.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public cancelOrder(
        accountId: string,
        orderId: string,
        locale: Locale,
    ): Observable<(SuccessResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/accounts/{accountId}/orders/{orderId}',
            path: {
                'accountId': accountId,
                'orderId': orderId,
            },
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Preview Order
     * Get estimated cost, commission and other information for an order without the order actually being placed or modified. This information is displayed in the Order Ticket Preview.
     * This endpoint is used if supportPlaceOrderPreview and/or supportModifyOrderPreview flag is `true`.
     * TradingView displays the following information by itself&#58; symbol, bid/ask, order type, side, quantity, price (except market orders), stop loss, take profit and currency.
     * Custom `Order dialog` fields defined in the [/accounts](#operation/getAccounts) are sent along with the standard fields in the order object.
     *
     * @param accountId Account identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public previewOrder(
        accountId: string,
        locale: Locale,
        formData: (PlaceModifyPreviewOrderCommon & PlacePreviewOrderCommon & {
            /**
             * Identifier of the order that is being modified by the user. This parameter is sent only if `supportModifyOrderPreview` flag is `true`.
             */
            id?: string;
        } & {
            /**
             * The number of units.
             */
            qty: number;
            /**
             * Instrument.
             */
            instrument: string;
            /**
             * Side.
             */
            side: 'buy' | 'sell';
            /**
             * Type.
             */
            type: 'market' | 'stop' | 'limit' | 'stoplimit';
        }),
    ): Observable<(PreviewOrderResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/accounts/{accountId}/previewOrder',
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
     * Modify Position
     * Modify an existing position stop loss or take profit or both.
     *
     * @param accountId Account identifier.
     * @param positionId Position identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public modifyPosition(
        accountId: string,
        positionId: string,
        locale: Locale,
        formData: {
            /**
             * New side of the position. This parameter is used to reverse the position,
             * if the `supportNativeReversePosition` flag is enabled in the account config.
             * Please see the [/accounts](#operation/getAccounts) endpoint.
             *
             */
            side?: 'buy' | 'sell';
            /**
             * StopLoss price.
             */
            stopLoss?: number;
            /**
             * Distance from the stop loss level to the order price in pips.
             */
            trailingStopPips?: number;
            /**
             * TakeProfit price.
             */
            takeProfit?: number;
        },
    ): Observable<(SuccessResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/accounts/{accountId}/positions/{positionId}',
            path: {
                'accountId': accountId,
                'positionId': positionId,
            },
            query: {
                'locale': locale,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * Close Position
     * Close an existing position.
     * @param accountId Account identifier.
     * @param positionId Position identifier.
     * @param locale Locale (language) id.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public closePosition(
        accountId: string,
        positionId: string,
        locale: Locale,
        formData?: {
            /**
             * Amount to close. This property is used if supportPartialClosePosition flag is `true`.
             */
            amount?: number;
        },
    ): Observable<(SuccessResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'DELETE',
            url: '/accounts/{accountId}/positions/{positionId}',
            path: {
                'accountId': accountId,
                'positionId': positionId,
            },
            query: {
                'locale': locale,
            },
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

}
