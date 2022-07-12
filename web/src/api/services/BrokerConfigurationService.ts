/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { ConfigResponse } from '../models/ConfigResponse';
import type { ErrorResponse } from '../models/ErrorResponse';
import type { Locale } from '../models/Locale';
import type { SymbolMapping } from '../models/SymbolMapping';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class BrokerConfigurationService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Configuration
     * Get localized configuration.
     * @param locale Locale (language) id.
     * @returns any response
     * @throws ApiError
     */
    public getConfiguration(
        locale: Locale,
    ): Observable<(ConfigResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/config',
            query: {
                'locale': locale,
            },
        });
    }

    /**
     * Mapping
     * Return all broker instruments with corresponding TradingView instruments.
     * It is required to add a Broker to TradingView.com.
     * Please note that this endpoint works without authorization!
     *
     * @returns SymbolMapping response
     * @throws ApiError
     */
    public getMapping(): Observable<SymbolMapping> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/mapping',
        });
    }

}
