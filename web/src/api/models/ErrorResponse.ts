/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ErrorResponse = {
    /**
     * Status will always be `error`.
     */
    's': ErrorResponse.'s';
    /**
     * Error message.
     */
    errmsg: string;
};

export namespace ErrorResponse {

    /**
     * Status will always be `error`.
     */
    export enum 's' {
        ERROR = 'error',
    }


}

