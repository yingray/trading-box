/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderPreviewSectionRow } from './OrderPreviewSectionRow';

/**
 * Describes a single order preview section. Order preview can have multiple sections that are divided by separators and may have titles.
 */
export type OrderPreviewSection = {
    /**
     * Array of order preview items. Each item is a row of the section table.
     */
    rows: Array<OrderPreviewSectionRow>;
    /**
     * Optional title of the section.
     */
    header?: string;
};

