/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { ErrorResponse } from '../models/ErrorResponse';
import type { HistoryEmptyBarResponse } from '../models/HistoryEmptyBarResponse';
import type { HistoryNoDataResponse } from '../models/HistoryNoDataResponse';
import type { HistorySuccessResponse } from '../models/HistorySuccessResponse';
import type { StreamingAskResponse_deprecated_ } from '../models/StreamingAskResponse_deprecated_';
import type { StreamingBidResponse_deprecated_ } from '../models/StreamingBidResponse_deprecated_';
import type { StreamingDailyBarResponse } from '../models/StreamingDailyBarResponse';
import type { StreamingQuoteResponse } from '../models/StreamingQuoteResponse';
import type { StreamingTradeResponse } from '../models/StreamingTradeResponse';
import type { SymbolInfoResponse } from '../models/SymbolInfoResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class DataIntegrationService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Symbol Info
     * Get a list of all instruments.
     * @param group ID of a symbol group. If it presents then only symbols that belong to this group should be returned.
     * Possible values are provided by the [/groups](#operation/getGroups) endpoint.
     * It is only required if you use groups of symbols to restrict access to instrument's data.
     *
     * @returns any response
     * @throws ApiError
     */
    public getSymbolInfo(
        group?: string,
    ): Observable<(SymbolInfoResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/symbol_info',
            query: {
                'group': group,
            },
        });
    }

    /**
     * History
     * Request for history bars. Each property of the response object is treated as a table column.
     *
     * Data should meet the following requirements:
     *
     * - real-time data obtained from the API streaming endpoint must match the historical data, obtained from the
     * /history API. The allowed count of mismatched bars (candles) must not exceed 5% for frequently traded symbols,
     * otherwise the integration to TradingView is not possible;
     * - the data must not include unreasonable price gaps, historical data gaps on 1-minute and Daily-resolutions
     * (temporal gaps), obviously incorrect prices (adhesions).
     *
     * Bar time for daily bars should be 00:00 UTC and is expected to be a trading day
     * (not a day when the session starts).
     *
     * Bar time for monthly bars should be 00:00 UTC and is the first trading day of the month.
     *
     * If there is no data in the requested time period but there is data in the previous time period you should return
     * an empty response: `{"s":"ok","t":[],"o":[],"h":[],"l":[],"c":[],"v":[]}`
     *
     * If there is no data in the requested and previous time periods then you should set the status code to `no_data`.
     *
     * @param symbol Symbol name or ticker.
     * @param resolution Symbol resolution. Possible resolutions are daily (`D` or `1D`, `2D` ... ),
     * weekly (`1W`, `2W` ...), monthly (`1M`, `2M`...) and an intra-day
     * resolution &ndash; minutes(`1`, `2` ...).
     *
     * @param from Unix timestamp (UTC) of the leftmost required bar, including `from`.
     * @param to Unix timestamp (UTC) of the rightmost required bar, including `to`. It can be in the future.
     * In this case, the rightmost required bar is the latest available bar.
     *
     * @param countback Number of bars (higher priority than `from`) starting with `to`. If
     * `countback` is set, `from` should be ignored.
     *
     * @returns any response
     * @throws ApiError
     */
    public getHistory(
        symbol: string,
        resolution: string,
        from: number,
        to: number,
        countback?: number,
    ): Observable<(HistorySuccessResponse | HistoryNoDataResponse | HistoryEmptyBarResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/history',
            query: {
                'symbol': symbol,
                'resolution': resolution,
                'from': from,
                'to': to,
                'countback': countback,
            },
        });
    }

    /**
     * Stream of prices
     * Stream of prices. Server constantly keeps the connection alive. If the
     * connection is broken - the server constantly tries to restore it.
     * TradingView establishes up to 4 simultaneous connections to this endpoint and
     * expects to get the same data to all of them.
     * Transfer mode is `chunked encoding`. The data feed should set `'Transfer-Encoding:
     * chunked'` and make sure that all intermediate proxies are set to use this
     * mode. All messages are to be ended with `\n`. Data stream should contain
     * real-time data only. It shouldn't contain snapshots of data.
     *
     * Data feed should provide trades and quotes:
     * - If trades are not provided, then data feed should set trades with bid price and bid size (mid price with 0 size in case of Forex).
     * - Size is always greater than `0`, except for the correction. In that case size can be `0`.
     * - Quote must contain prices of the best ask and the best bid.
     * - Daily bars are required if they cannot be built from trades (has-daily should be set to true in the symbol information in that case).
     *
     * The broker must remove unnecessary restrictions (firewall, rate limits, etc.) for the set of IP addresses of our servers.
     *
     * Please note, that `StreamingAskResponse` and `StreamingBidResponse` are deprecated.
     * The `StreamingQuoteResponse` should be used to provide ask / bid data.
     *
     * @returns any response
     * @throws ApiError
     */
    public streaming(): Observable<(StreamingQuoteResponse | StreamingTradeResponse | StreamingDailyBarResponse | StreamingAskResponse_deprecated_ | StreamingBidResponse_deprecated_)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/streaming',
        });
    }

}
