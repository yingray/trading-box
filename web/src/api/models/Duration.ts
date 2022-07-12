/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Single duration option.
 */
export type Duration = {
    /**
     * Duration identifier.
     */
    id: string;
    /**
     * Localized title.
     */
    title: string;
    /**
     * Display date control in Order Ticket for this duration type.
     */
    hasDatePicker?: boolean;
    /**
     * Display time control in Order Ticket for this duration type.
     */
    hasTimePicker?: boolean;
    /**
     * Default duration. Only one duration object in the durations array can have a `true` value for this field. The default duration will be used when the user places orders in the silent mode and it will be the selected one when the user opens the Order dialog for the first time.
     */
    default?: boolean;
    /**
     * An optional array of order types to which the duration will be applied.
     */
    supportedOrderTypes?: Array<'market' | 'stop' | 'limit' | 'stoplimit'>;
};

