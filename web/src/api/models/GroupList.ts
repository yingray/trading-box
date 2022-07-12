/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GroupList = {
    /**
     * Each element of this array is an group object.
     *
     */
    groups?: Array<{
        /**
         * All characters in a group id must be either a lowercase alphabetic character or an underscore.
         * A group id should start with the same prefix related to the broker's name.
         *
         */
        id: string;
    }>;
};

