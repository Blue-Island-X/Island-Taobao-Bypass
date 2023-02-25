import island from 'island-union-sdk';
export declare class TaobaoHack {
    limit: number;
    taobaoClient: InstanceType<typeof island.taobao.Client>;
    constructor(client: InstanceType<typeof island.taobao.Client>, limit?: number);
    private equal;
    getGoodsById(goodsId: string, adzoneId: string, tmall?: boolean, precise?: boolean): Promise<any>;
}
