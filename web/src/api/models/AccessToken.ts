/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Access token.
 */
export type AccessToken = {
    /**
     * Access token acts as a session ID that the application uses for making
     * requests. This token should be protected as if it were user
     * credentials.
     *
     */
    access_token: string;
    /**
     * The time when the token is expired is represented as the number of
     * seconds since the Unix epoch (00:00:00 UTC on 1 January 1970).
     *
     */
    expiration: number;
};

