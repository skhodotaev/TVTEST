import { DatafeedConfiguration, IDatafeedChartApi, IDatafeedQuotesApi, IDestroyable, LibrarySymbolInfo, OnReadyCallback, ResolutionString, ResolveCallback, SearchSymbolResultItem, SearchSymbolsCallback, SymbolResolveExtension, ErrorCallback, PeriodParams, HistoryCallback, SubscribeBarsCallback, QuotesCallback, QuotesErrorCallback, DOMCallback } from "../charting_library";
import { TvDefaultSymbol } from "./TvDefaultSymbol";

export class TvDataFeed implements IDatafeedChartApi, IDatafeedQuotesApi {

    // #region TradingView DataFeed interface implementation
    public onReady (callback: OnReadyCallback) {
        setTimeout(() => {

            const allowedResolutions: string[] =
            [
                '1',
                '5',
                '15',
                '30',
                '60',
                '240',
                '1D',
                '1W',
                '1M',
                '12M'
            ];

            const configuration: DatafeedConfiguration =
            {
                supported_resolutions: allowedResolutions as ResolutionString[],
            };
            callback(configuration);
        }, 0);
    }

    public searchSymbols (userInput: string, exchange: string, symbolType: string, onResultReadyCallback: SearchSymbolsCallback): void {
        
        setTimeout(() => {
            const resultItem : SearchSymbolResultItem = {
                symbol: TvDefaultSymbol.name,
                full_name: TvDefaultSymbol.full_name,
                description: TvDefaultSymbol.description,
                exchange: TvDefaultSymbol.exchange,
                ticker: TvDefaultSymbol.ticker,
                type: TvDefaultSymbol.type,
            }
            onResultReadyCallback([resultItem]);
        }, 0);
    }

    public resolveSymbol(symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension?: SymbolResolveExtension): void {

        setTimeout(() => {
            const fakeInfo: LibrarySymbolInfo =
            {
                name: TvDefaultSymbol.name,
                ticker: TvDefaultSymbol.ticker,
                full_name: TvDefaultSymbol.full_name,
                description: TvDefaultSymbol.description,
                type: TvDefaultSymbol.type,
                session: TvDefaultSymbol.session,
                exchange: TvDefaultSymbol.exchange,
                listed_exchange: TvDefaultSymbol.listed_exchange,
                timezone: TvDefaultSymbol.timezone,
                format: TvDefaultSymbol.format,
                minmov: TvDefaultSymbol.minmov,
                pricescale: TvDefaultSymbol.pricescale,
                has_intraday: true,
            }
            onResolve(fakeInfo);
        }, 0);
    }

    public getBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onResult: HistoryCallback, onError: ErrorCallback): void{
        setTimeout(() => {
            onResult([], {noData: true});
        }, 0);
    }

    public subscribeBars(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback: () => void): void {
    }

    public unsubscribeBars(listenerGuid: string): void {
    }
    // #endregion TradingView DataFeed interface implementation

    // #region IDatafeedQuotesApi - works only for trading platform

    public getQuotes (symbols: string[], onDataCallback: QuotesCallback, onErrorCallback: QuotesErrorCallback): void {
    }

    public subscribeQuotes (symbols: string[], fastSymbols: string[], onRealtimeCallback: QuotesCallback, listenerGUID: string): void {   
    }

    public unsubscribeQuotes (listenerGUID: string): void {
    }
    // #endregion

    // #region  Level2

    public subscribeDepth (symbol: string, callback: DOMCallback): string {
        return "subscribeDepth";
    }

    public unsubscribeDepth (subscriberUID: string): void {
    }
    // #endregion
}