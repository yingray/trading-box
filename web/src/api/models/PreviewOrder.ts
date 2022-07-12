/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderPreviewSection } from './OrderPreviewSection';

export type PreviewOrder = {
    /**
     * An optional identifier of an order. It is sent back to the server in the place order request.
     */
    confirmId?: string;
    sections: Array<OrderPreviewSection>;
    /**
     * Optional array of text warnings.
     */
    warnings?: Array<string>;
    /**
     * Optional array of text errors.
     */
    errors?: Array<string>;
};

