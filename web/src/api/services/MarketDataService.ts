/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { DepthResponse } from '../models/DepthResponse';
import type { ErrorResponse } from '../models/ErrorResponse';
import type { Locale } from '../models/Locale';
import type { QuotesResponse } from '../models/QuotesResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class MarketDataService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Quotes
     * Get current prices of the instrument.
     * The `bid` and `ask` fields are required, and the `buyPipValue` and `sellPipValue` fields
     * are desirable if the account currency is different from the currency of the instrument.
     * The same values should be sent for these fields if different values for buying and selling are not supported.
     *
     * @param locale Locale (language) id.
     * @param accountId Account identifier.
     * @param symbols Comma separated symbol list.
     * @returns any response
     * @throws ApiError
     */
    public getQuotes(
        locale: Locale,
        accountId: string,
        symbols: string,
    ): Observable<(QuotesResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/quotes',
            query: {
                'locale': locale,
                'accountId': accountId,
                'symbols': symbols,
            },
        });
    }

    /**
     * Depth
     * Get current depth of market for the instrument. Optional.
     * @param locale Locale (language) id.
     * @param accountId Account identifier.
     * @param symbol Instrument name.
     * @returns any response
     * @throws ApiError
     */
    public getDepth(
        locale: Locale,
        accountId: string,
        symbol: string,
    ): Observable<(DepthResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/depth',
            query: {
                'locale': locale,
                'accountId': accountId,
                'symbol': symbol,
            },
        });
    }

}
