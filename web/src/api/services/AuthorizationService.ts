/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { AuthorizeResponse } from '../models/AuthorizeResponse';
import type { ErrorResponse } from '../models/ErrorResponse';
import type { Locale } from '../models/Locale';
import type { SuccessResponse } from '../models/SuccessResponse';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class AuthorizationService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Authorize
     * Username and password authentication.
     * @param formData
     * @returns any response
     * @throws ApiError
     */
    public authorize(
        formData: {
            /**
             * User login.
             */
            login: string;
            /**
             * User password.
             */
            password: string;
            locale: Locale;
        },
    ): Observable<(AuthorizeResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/authorize',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
        });
    }

    /**
     * Logout
     * Send logout if the supportLogout flag is set as true.
     * @returns any response
     * @throws ApiError
     */
    public logout(): Observable<(SuccessResponse | ErrorResponse)> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/logout',
        });
    }

}
