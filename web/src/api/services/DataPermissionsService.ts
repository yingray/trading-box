/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { ErrorResponse } from '../models/ErrorResponse';
import type { GroupListResponse } from '../models/GroupListResponse';
import type { PermissionsResponse } from '../models/PermissionsResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class DataPermissionsService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Groups
     * Get a list of possible groups of symbols.
     * A group is a set of symbols that share a common access level. Any user can have access to any number of such groups.
     * It is required only if you use groups of symbols in order to restrict access to the instrument's data.
     *
     * **IMPORTANT:**
     * Please plan your symbol grouping carefully. Groups cannot be deleted, you can only remove all the symbols from there.
     *
     * **LIMITATIONS:**
     * Each integration is limited to have up to 10 symbol groups.
     * Each symbol group is limited to have up to 10K symbols in it.
     * You cannot put the same symbol into 2 different groups.
     *
     * This endpoint allows you to specify a list of groups, and the [/permissions](#operation/getPermissions) endpoint specifies
     * which groups are available for the certain user.
     *
     * When TradingView user logs into his broker account - he will gain access to one or more groups,
     * depending on the [/permissions](#operation/getPermissions) endpoint.
     *
     * At the [/symbol_info](#operation/getSymbolInfo) endpoint TradingView adds the GET argument `group`
     * with the name of the group. Thus, TradingView will receive information about which group each symbol belongs to.
     *
     * @returns any response
     * @throws ApiError
     */
    public getGroups(): Observable<(GroupListResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/groups',
        });
    }

    /**
     * Permissions
     * Get a list of symbol groups allowed for the user.
     * It is only required if you use groups of symbols to restrict access to instrument's data.
     *
     * @returns any response
     * @throws ApiError
     */
    public getPermissions(): Observable<(PermissionsResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/permissions',
        });
    }

}
