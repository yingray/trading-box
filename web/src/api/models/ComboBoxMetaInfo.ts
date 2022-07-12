/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComboBoxValue } from './ComboBoxValue';

export type ComboBoxMetaInfo = {
    /**
     * Unique field identifier.
     */
    id: string;
    /**
     * Localized field display name.
     */
    title: string;
    /**
     * Whether the value should be stored in the user settings and preserved for the next time the dialog is displayed.
     */
    saveToSettings?: boolean;
    /**
     * Whether the integration supports modifying of this field.
     */
    mutable?: boolean;
    /**
     * If this flag is set to true, the user will not be able to place an order without explicitly entering a value, so instant order placement is not available.
     */
    forceUserEnterInitialValue?: boolean;
    items: Array<ComboBoxValue>;
};

