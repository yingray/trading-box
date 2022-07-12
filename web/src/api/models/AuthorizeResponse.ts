/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccessToken } from './AccessToken';
import type { OkStatus } from './OkStatus';

export type AuthorizeResponse = {
    's': OkStatus;
    'd': AccessToken;
};

