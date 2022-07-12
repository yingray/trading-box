/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StreamingAskBidTradeItem } from './StreamingAskBidTradeItem';
import type { StreamingTradeItemType } from './StreamingTradeItemType';

export type StreamingTradeResponse = (StreamingTradeItemType & StreamingAskBidTradeItem);

