import { TvBrokerTerminal } from "./BrokerTerminal/TvBrokerTerminal.js";
import { TvDataFeed } from "./DataFeed/TvDataFeed.js";
import { IBrokerConnectionAdapterHost, IDatafeedChartApi } from "./charting_library";

declare const TradingView: any;
declare const Brokers: any;
declare const Datafeeds: any;

class TradingPlatformApp {

    public  Init (): void {
        const testDatafeed: IDatafeedChartApi = new TvDataFeed();

        const widget = new TradingView.widget({
            debug: true,
            fullscreen: true,
            symbol: 'AAPL',
            interval: '1D',
            container: 'chartContainer',

            datafeed: testDatafeed,
            library_path: 'charting_library/',
            locale: 'en',

            //disabled_features: ['use_localstorage_for_settings'],
            enabled_features: [/*'study_templates',*/ 'dom_widget'],
            //charts_storage_url: 'https://saveload.tradingview.com',
            //charts_storage_api_version: '1.1',
            //client_id: 'trading_platform_demo',
            //user_id: 'public_user',
            theme: 'light',

            widgetbar: {
                details: true,
                news: true,
                watchlist: true,
                datawindow: true,
                // watchlist_settings: {
                //     default_symbols: ['MSFT', 'IBM', 'AAPL']
                // }
            },

            rss_news_feed: {
                default: [{
                    url: 'https://demo-feed-data.tradingview.com/news?symbol={SYMBOL}',
                    name: 'Yahoo Finance'
                }]
            },

            broker_factory: function (host: IBrokerConnectionAdapterHost) { return new TvBrokerTerminal(host); },
            broker_config: {
                configFlags: {
                    supportBottomWidget: true,
                    supportNativeReversePosition: true,
                    supportClosePosition: true,
                    supportPLUpdate: true,
                    supportLevel2Data: false,
                    showQuantityInsteadOfAmount: true,
                    supportEditAmount: false,
                    supportOrderBrackets: true,
                    supportMarketBrackets: true,
                    supportPositionBrackets: true
                },
                durations: [
                    { name: 'DAY', value: 'DAY' },
                    { name: 'GTC', value: 'GTC' }
                ],
                orderDialogOptions: {
                    customFields: [
                        {
                            id: '2410',
                            inputType: 'ComboBox',
                            title: 'Execution',
                            items: [
                                {
                                    text: 'General',
                                    value: 'General'
                                },
                                {
                                    text: 'Iceberg',
                                    value: 'Iceberg'
                                },
                                {
                                    text: 'AOL',
                                    value: 'AOL'
                                }
                            ]
                        }
                    ]
                }
            }
        });
    }
}

export const TpAppInstanse = new TradingPlatformApp();
