import union from '@blueislandx/island-union-sdk';
export declare class TaobaoHack {
    limit: number;
    taobaoClient: InstanceType<typeof union.taobao.Client>;
    constructor(client: InstanceType<typeof union.taobao.Client>, limit?: number);
    private equal;
    getGoodsById(goodsId: string, adzoneId: string, tmall?: boolean, precise?: boolean): Promise<any>;
}
