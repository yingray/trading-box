/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Informational message description, that will be displayed for the order or position in the Account manager. The message will be marked
 * with a color, corresponding to a message type.
 * Also, the message text will be displayed in the notification pop-up in case that order type is set to `rejected`.
 *
 */
export type Message = {
    /**
     * Message text
     */
    text: string;
    /**
     * Message type
     */
    type: Message.type;
};

export namespace Message {

    /**
     * Message type
     */
    export enum type {
        INFORMATION = 'information',
        WARNING = 'warning',
        ERROR = 'error',
    }


}

