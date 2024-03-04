import { TvDefaultSymbol } from "../DataFeed/TvDefaultSymbol";
import { AccountManagerInfo, ActionMetaInfo, Brackets, ConnectionStatus, CustomInputFieldsValues, DefaultContextMenuActionsParams, Execution, IBrokerConnectionAdapterHost, IBrokerTerminal, INumberFormatter, InstrumentInfo, IsTradableResult, LeverageInfo, LeverageInfoParams, LeveragePreviewResult, LeverageSetParams, LeverageSetResult, Order, OrderDialogOptions, OrderPreviewResult, PlaceOrderResult, Position, PositionDialogOptions, PreOrder, QuantityMetainfo, Side, SymbolType, Trade, TradeContext } from "../charting_library";
import { accountSummaryColumns, ordersPageColumns, positionsPageColumns } from "./TvColumns";

export class TvBrokerTerminal implements IBrokerTerminal {

    private readonly host: IBrokerConnectionAdapterHost;

    constructor (host: IBrokerConnectionAdapterHost)
    {
        this.host = host;
    }

    subscribeRealtime(symbol: string): void {
    }
    unsubscribeRealtime(symbol: string): void {
    }
    subscribeDOM?(symbol: string): void {
    }
    unsubscribeDOM?(symbol: string): void {
    }
    placeOrder(order: PreOrder, confirmId?: string | undefined): Promise<PlaceOrderResult> {
        throw new Error("Method not implemented.");
    }
    previewOrder?(order: PreOrder): Promise<OrderPreviewResult> {
        throw new Error("Method not implemented.");
    }
    modifyOrder(order: Order, confirmId?: string | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    cancelOrder(orderId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    cancelOrders(symbol: string, side: Side | undefined, ordersIds: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    reversePosition?(positionId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    closePosition?(positionId: string, amount?: number | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    closeTrade?(tradeId: string, amount?: number | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    editPositionBrackets?(positionId: string, brackets: Brackets, customFields?: CustomInputFieldsValues | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    editTradeBrackets?(tradeId: string, brackets: Brackets): Promise<void> {
        throw new Error("Method not implemented.");
    }
    leverageInfo?(leverageInfoParams: LeverageInfoParams): Promise<LeverageInfo> {
        throw new Error("Method not implemented.");
    }
    setLeverage?(leverageSetParams: LeverageSetParams): Promise<LeverageSetResult> {
        throw new Error("Method not implemented.");
    }
    previewLeverage?(leverageSetParams: LeverageSetParams): Promise<LeveragePreviewResult> {
        throw new Error("Method not implemented.");
    }
    subscribeEquity?(): void {

    }
    subscribeMarginAvailable?(symbol: string): void {
    }
    subscribePipValue?(symbol: string): void {

    }
    unsubscribePipValue?(symbol: string): void { 
    }
    unsubscribeMarginAvailable?(symbol: string): void {
    }
    unsubscribeEquity?(): void {
    }
    async chartContextMenuActions(context: TradeContext, options?: DefaultContextMenuActionsParams | undefined): Promise<ActionMetaInfo[]> {
        return await this.host.defaultContextMenuActions(context, options);
    }
    async isTradable(symbol: string): Promise<boolean | IsTradableResult> {
        const isTradable: boolean = true;
        return await Promise.resolve(isTradable);
    }
    connectionStatus(): ConnectionStatus {
        return ConnectionStatus.Connected;
    }
    orders(): Promise<Order[]> {
        return Promise.resolve([]);
    }
    ordersHistory?(): Promise<Order[]> {
        return Promise.resolve([]);
    }
    positions?(): Promise<Position[]> {
        return Promise.resolve([]);
    }
    trades?(): Promise<Trade[]> {
        return Promise.resolve([]);
    }
    executions(symbol: string): Promise<Execution[]> {
        return Promise.resolve([]);
    }
    public async symbolInfo(symbol: string): Promise<InstrumentInfo> {
        return await new Promise((resolve, reject) => {
            const qtyInfo: QuantityMetainfo =
            {
                min: 1,
                max: 1000000,
                step: 1
            };

            const instrumentInfo: InstrumentInfo =
            {
                qty: qtyInfo,
                pipValue: 1,
                pipSize: 0.00001,
                minTick: 0.00001,
                lotSize: 0.1,
                type: TvDefaultSymbol.type as SymbolType,
                brokerSymbol: 'InstrumentInfoBrokerSymbol',
                description: 'InstrumentInfoDescription',

                units: 'QuantityUnits',
            };
            resolve(instrumentInfo);
        });
    }
    accountManagerInfo(): AccountManagerInfo {

        const accManagerInfo: AccountManagerInfo =
        {
            accountTitle: 'AccountTitle',
            summary: [],
            orderColumns: ordersPageColumns,
            positionColumns: positionsPageColumns,
            pages: [
                {
                    id: 'accountsummary',
                    title: 'Account Summary',
                    tables: [
                        {
                            id: 'accountsummary',
                            columns: accountSummaryColumns,
                            getData: () => {
                                return Promise.resolve([0]);
                            },
                            initialSorting: {
                                property: 'balance',
                                asc: false,
                            },
                            changeDelegate: this.host.factory.createDelegate(),
                        },
                    ],
                },
            ],
        };

        return accManagerInfo;
    }
    formatter?(symbol: string, alignToMinMove: boolean): Promise<INumberFormatter> {
        return this.host.defaultFormatter(symbol, alignToMinMove);
    }
    spreadFormatter?(symbol: string): Promise<INumberFormatter> {
        return this.host.defaultFormatter(symbol, true);
    }
    quantityFormatter?(symbol: string): Promise<INumberFormatter> {
        return this.host.quantityFormatter(0);
    }
    // getOrderDialogOptions?(symbol: string): Promise<OrderDialogOptions | undefined> {
    //     throw new Error("Method not implemented.");
    // }
    // getPositionDialogOptions?(): PositionDialogOptions | undefined {
    //     throw new Error("Method not implemented.");
    // }

}