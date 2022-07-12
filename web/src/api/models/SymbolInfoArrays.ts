/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SymbolType } from './SymbolType';

/**
 * SymbolInfo is an object containing symbols metadata. Each value of this  object is an array of values which
 * size is equal to symbols count or a single value that is applied to all symbols.
 * You can use a single value for all fields except for `supported-resolutions` and `intraday-multipliers`.
 *
 */
export type SymbolInfoArrays = {
    /**
     * This is the name of the symbol - a string that the users will see. It should contain uppercase letters,
     * numbers, a dot or an underscore. Also, it will be used for data requests if you are not using tickers.
     *
     */
    symbol: Array<string>;
    /**
     * Description of a symbol. Will be displayed in the chart legend for this symbol.
     *
     */
    description: Array<string>;
    /**
     * Symbol currency, also named as counter currency. If a symbol is a currency pair, then the currency field has
     * to contain the second currency of this pair. For example, `USD` is a currency for `EURUSD` ticker.
     * Fiat currency must meet the ISO 4217 standard.
     *
     */
    currency: Array<string | null> | null;
    /**
     * For currency pairs only. This field contains the first currency of the pair. For example, base currency for
     * `EURUSD` ticker is `EUR`. Fiat currency must meet the ISO 4217 standard.
     *
     */
    'base-currency'?: Array<string | null> | null;
    /**
     * Short name of exchange where this symbol is listed.
     */
    'exchange-listed': Array<string>;
    /**
     * Short name of exchange where this symbol is traded.
     */
    'exchange-traded': Array<string>;
    /**
     * Minimal integer price change.
     */
    minmovement: Array<number>;
    /**
     * This is a number for complex price formatting cases. The default value is `0`.
     */
    minmovement2?: Array<number>;
    /**
     * Boolean showing whether this symbol wants to have complex price
     * formatting (see `minmov2`) or not. The default value is `false`.
     *
     */
    fractional?: Array<boolean>;
    /**
     * Indicates how many decimal points the price has. For example, if the price has 2 decimal points (ex., 300.01),
     * then `pricescale` is `100`. If it has 3 decimals, then `pricescale` is `1000` etc. If the price doesn't have decimals,
     * set `pricescale` to `1`.
     *
     */
    pricescale: Array<number>;
    /**
     * Root of the features. It's required for futures symbol types only.
     * Provide a null value for other symbol types.
     *
     */
    root?: Array<string | null> | null;
    /**
     * Short description of the futures root that will be displayed in the symbol search.
     * It's required for futures only. Provide a null value for other symbol types.
     *
     */
    'root-description'?: Array<string | null> | null;
    /**
     * Boolean value showing whether the symbol includes intraday (minutes)
     * historical data. If it's `false` then all buttons for intraday resolutions
     * will be disabled for this particular symbol. If it is set to `true`, all
     * resolutions that are supplied directly by the datafeed must be provided
     * in `intraday-multipliers` array. The default value is `true`.
     *
     */
    'has-intraday'?: Array<boolean>;
    /**
     * Boolean showing whether the symbol includes volume data or not. The default value is `false`.
     */
    'has-no-volume'?: Array<boolean>;
    /**
     * Symbol type (forex/stock etc.).
     */
    type: Array<SymbolType>;
    /**
     * Boolean value showing whether the symbol is CFD. The base instrument type is set using the type field.
     */
    'is-cfd'?: Array<boolean>;
    /**
     * This is a unique identifier for this particular symbol in your symbology.
     * If you specify this property then its value will be used for all data requests for this symbol.
     *
     */
    ticker?: Array<string>;
    /**
     * Timezone of the exchange for this symbol. We expect to get the name of the time zone in olsondb format.
     *
     */
    timezone: Array<'America/New_York' | 'America/Los_Angeles' | 'America/Chicago' | 'America/Phoenix' | 'America/Toronto' | 'America/Vancouver' | 'America/Argentina/Buenos_Aires' | 'America/El_Salvador' | 'America/Sao_Paulo' | 'America/Bogota' | 'Europe/Moscow' | 'Europe/Athens' | 'Europe/Berlin' | 'Europe/London' | 'Europe/Madrid' | 'Europe/Paris' | 'Europe/Warsaw' | 'Australia/Sydney' | 'Australia/Brisbane' | 'Australia/Adelaide' | 'Australia/ACT' | 'Asia/Almaty' | 'Asia/Ashkhabad' | 'Asia/Tokyo' | 'Asia/Taipei' | 'Asia/Singapore' | 'Asia/Shanghai' | 'Asia/Seoul' | 'Asia/Tehran' | 'Asia/Dubai' | 'Asia/Kolkata' | 'Asia/Hong_Kong' | 'Asia/Bangkok' | 'Pacific/Auckland' | 'Pacific/Chatham' | 'Pacific/Fakaofo' | 'Pacific/Honolulu' | 'America/Mexico_City' | 'Africa/Johannesburg' | 'Asia/Kathmandu' | 'US/Mountain' | 'Etc/UTC'>;
    /**
     * Session time format is HHMM-HHMM. E.g., a session that starts at 9:30 am and ends at 4:00 pm should look like `0930-1600`.
     * There is a special case for symbols traded 24/7 (e.g., Bitcoin and other cryptocurrencies): the session string should be `24x7`.
     * To specify an overnight session set start time greater than end time (ie, `1700-0900`).
     * Session time is expected to be in exchange time zone.
     *
     */
    'session-regular': Array<string>;
    /**
     * An extended session, includes `session-premarket` and `session-postmarket`.
     * The start time should be earlier or be equal to the start time of the `session-regular`
     * and be equal to the start time of the `session-premarket` if it exists.
     *
     */
    'session-extended'?: Array<string | null>;
    /**
     * An additional session before `session-regular`. The start time should be equal to the start time of the `session-extended`.
     * The end time should be equal or less than the start time of the `session-regular`.
     *
     */
    'session-premarket'?: Array<string | null>;
    /**
     * An additional session after the `session-regular`. The start time should be equal or greater
     * than the end time of the `session-regular`. The end time should be equal to the end time of the `session-extended`.
     *
     */
    'session-postmarket'?: Array<string | null>;
    /**
     * An array of resolutions which should be enabled in resolutions picker
     * for this symbol. Each item of an array is expected to be a string.
     *
     */
    'supported-resolutions'?: Array<Array<string>>;
    /**
     * The boolean value showing whether data feed has its own daily
     * resolution bars or not. If `has-daily` = `false` then Charting Library
     * will build the respective resolutions using 1-minute bars by itself.
     * If not, then it will request those bars from the data feed.
     * The default value is `true`.
     *
     */
    'has-daily'?: Array<boolean>;
    /**
     * This is an array containing intraday resolutions (in minutes) that the data feed may provide.
     * E.g., if the data feed supports resolutions such as `["1", "5", "15"]`, but has 1-minute bars
     * for some symbols then you should set `intraday-multipliers` of this symbol to `[1]`. This will
     * make Charting Library build 5 and 15-minute resolutions by itself.
     *
     */
    'intraday-multipliers'?: Array<Array<string>>;
    /**
     * The boolean value showing whether data feed has its own weekly
     * and monthly resolution bars or not. If `has-weekly-and-monthly` = `false`
     * then Charting Library will build the respective resolutions using daily
     * bars by itself. If not, then it will request those bars from the data feed.
     * The default value is `false`.
     *
     */
    'has-weekly-and-monthly'?: Array<boolean>;
    /**
     * The currency value of a single whole unit price change in the instrument's currency.
     * If the value is not provided it is assumed to be `1`.
     *
     */
    pointvalue?: Array<number>;
    /**
     * Expiration of the futures in the following format: YYYYMMDD. Required for futures type symbols only.
     *
     */
    expiration?: Array<number | null> | null;
    /**
     * The principle of building bars. The default value is `trade`.
     */
    'bar-source'?: Array<'bid' | 'ask' | 'mid' | 'trade'>;
    /**
     * The principle of bar alignment. The default value is `none`.
     */
    'bar-transform'?: Array<'none' | 'openprev' | 'prevopen'>;
    /**
     * Is used to create the zero-volume bars in the absence of any trades
     * (i.e. bars with zero volume and equal OHLC values ).
     * The default value is `false`.
     *
     */
    'bar-fillgaps'?: Array<boolean>;
};

