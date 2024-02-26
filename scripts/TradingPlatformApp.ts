declare const TradingView: any;
declare const Brokers: any;
declare const Datafeeds: any;

class TradingPlatformApp {

    public  Init (): void {
        const widget = new TradingView.widget({
            container: 'chartContainer',
            locale: 'en',
            library_path: 'charting_library/',
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo-feed-data.tradingview.com"),
            symbol: 'AAPL',
            interval: '1D',
            fullscreen: true,
            debug: true
        });
    }
}

export const TpAppInstanse = new TradingPlatformApp();
