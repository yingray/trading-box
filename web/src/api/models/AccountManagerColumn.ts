/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountManagerColumn = {
    id: string;
    /**
     * Localized title of a column.
     */
    title: string;
    /**
     * Tooltip that is shown on mouse hover.
     */
    tooltip?: string;
    /**
     * The cell value alignment. Default value is `left`
     */
    alignment?: AccountManagerColumn.alignment;
    /**
     * The first character of each word in the sentence will be capitalized. The rest of the symbols appearance does not change.
     */
    isCapitalize?: boolean;
};

export namespace AccountManagerColumn {

    /**
     * The cell value alignment. Default value is `left`
     */
    export enum alignment {
        LEFT = 'left',
        RIGHT = 'right',
    }


}

