/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ComboBoxMetaInfo } from './ComboBoxMetaInfo';

/**
 * Additional custom controls to be displayed in the Order dialog. At the moment, the only possible control type is the combo box. Data of the additional fields is filled from the [/orders](#operation/getOrders) endpoint.
 */
export type OrderDialogCustomFields = {
    comboBox?: Array<ComboBoxMetaInfo>;
};

