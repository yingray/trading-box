/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AccountFlags = {
    /**
     * Whether the integration supports brackets. Deprecated. Use supportOrderBrackets and supportPositionBrackets instead.
     * @deprecated
     */
    supportBrackets?: boolean;
    /**
     * Whether the integration supports brackets (take profit and stop loss) for orders.
     */
    supportOrderBrackets?: boolean;
    /**
     * Whether the integration supports brackets for market orders.
     */
    supportMarketBrackets?: boolean;
    /**
     * Whether the integration supports adding (or modifying) stop loss and take profit to positions.
     */
    supportPositionBrackets?: boolean;
    /**
     * Whether the integration supports the Positions tab. If you set it to `false`, the `/positions` endpoint will not be used.
     */
    supportPositions?: boolean;
    /**
     * Whether the integration supports multiple positions at one instrument at the same time.
     */
    supportMultiposition?: boolean;
    /**
     * Whether the integration supports closing of a position without a need for a user to fill an order.
     */
    supportClosePosition?: boolean;
    /**
     * Whether the integration supports partial closing of a position.
     */
    supportPartialClosePosition?: boolean;
    /**
     * Whether the integration supports reversing of a position. If this flag is set to `false` the reverse position button will be hidden.
     */
    supportReversePosition?: boolean;
    /**
     * Whether the integration natively supports reversing of a position. If it is natively supported then TradingView will send a request to the [Modify Position endpoint](#operation/modifyPosition) with the `side` parameter set. If it is not natively supported then a reversing order will be placed.
     */
    supportNativeReversePosition?: boolean;
    /**
     * Whether the integration supports market orders.
     */
    supportMarketOrders?: boolean;
    /**
     * Whether the integration supports limit orders.
     */
    supportLimitOrders?: boolean;
    /**
     * Whether the integration supports stop orders.
     */
    supportStopOrders?: boolean;
    /**
     * Whether the integration supports StopLimit orders.
     */
    supportStopLimitOrders?: boolean;
    /**
     * Whether the integration supports trailing stop orders.
     */
    supportTrailingStop?: boolean;
    /**
     * Whether stop orders should behave like Market-if-touched in both directions. Enabling this flag removes the direction check from the order dialog.
     */
    supportStopOrdersInBothDirections?: boolean;
    /**
     * Whether the integration supports partial order's execution. If this flag is set to `true`, then the 'Filled Qty' column will be displayed on the Orders tab.
     */
    supportPartialOrderExecution?: boolean;
    /**
     * Whether the integration supports the modification of the existing order. Deprecated. Use supportModifyOrderPrice, supportEditAmount and supportModifyBrackets instead.
     * @deprecated
     */
    supportModifyOrder?: boolean;
    /**
     * Whether the integration supports order price editing. If you set it to `false`, the price control in the order ticket will be disabled when modifying an order.
     */
    supportModifyOrderPrice?: boolean;
    /**
     * Whether the integration supports editing orders quantity. If you set it to `false`, the quantity control in the order ticket will be disabled when modifying an order.
     */
    supportEditAmount?: boolean;
    /**
     * Whether the integration supports order brackets editing. If you set it to `false`, the bracket's control in the order ticket will be disabled when modifying an order, and 'Modify' button will be hidden on a chart and in the Account Manager.
     */
    supportModifyBrackets?: boolean;
    /**
     * Whether the integration supports the modification of the duration of the existing order.
     */
    supportModifyDuration?: boolean;
    /**
     * Whether the account is used to exchange(trade) crypto currencies. This flag switches the Order Ticket to the Crypto Exchange mode. It adds second currency quantity control, currency labels etc.
     */
    supportCryptoExchangeOrderTicket?: boolean;
    /**
     * Whether the integration supports Digital signature input field in the Order Ticket.
     */
    supportDigitalSignature?: boolean;
    /**
     * Whether the integration supports providing and displaying information (such as commission, margin, value, etc.) about the order being placed before submitting it.
     */
    supportPlaceOrderPreview?: boolean;
    /**
     * Whether the integration supports providing and displaying information (such as commission, margin, value, etc.) about the order being modified before submitting it.
     */
    supportModifyOrderPreview?: boolean;
    /**
     * Renames Amount to Quantity in the Order Ticket.
     */
    showQuantityInsteadOfAmount?: boolean;
    /**
     * Whether the integration supports [/balances](/rest-api-spec/#operation/getBalances) request.
     */
    supportBalances?: boolean;
    /**
     * Whether the integration supports [/ordersHistory](/rest-api-spec/#operation/getOrdersHistory) request.
     */
    supportOrdersHistory?: boolean;
    /**
     * Whether the integration supports [/executions](/rest-api-spec/#operation/getExecutions) request.
     */
    supportExecutions?: boolean;
    /**
     * Whether the integration supports leverage. If the flag is set to `true`, a leverage input field will appear in the Order Widget. Click on the input field will activate a dedicated Leverage Dialog.
     */
    supportLeverage?: boolean;
    /**
     * Whether the integration supports DOM (Depth of market) widget to be available.
     */
    supportDOM?: boolean;
    /**
     * Whether the integration supports Level 2 data. It is required to display DOM levels. You must implement [/depth](/rest-api-spec/#operation/getDepth) endpoint to display DOM.
     */
    supportLevel2Data?: boolean;
    /**
     * Whether the integration provide `unrealizedPl` for positions. Otherwise P&L will be calculated automatically based on a simple algorithm.
     */
    supportPLUpdate?: boolean;
    /**
     * Whether the integration involves displaying broker instrument names in the Symbol Search. You may usually want to disable it if broker symbols are the same or you are using internal numbers as broker symbol names.
     */
    supportDisplayBrokerNameInSymbolSearch?: boolean;
    /**
     * Whether the integration supports logout.
     */
    supportLogout?: boolean;
    /**
     * Whether the integration supports custom Account Summary Row.
     */
    supportCustomAccountSummaryRow?: boolean;
    /**
     * Whether the integration supports custom fields for position.
     */
    supportPositionCustomFields?: boolean;
    /**
     * Whether the integration supports custom fields for order.
     */
    supportOrderCustomFields?: boolean;
    /**
     * Whether the integration supports custom fields for order history.
     */
    supportOrderHistoryCustomFields?: boolean;
};

