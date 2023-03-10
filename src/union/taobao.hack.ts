import union from '@blueislandx/island-union-sdk';

export class TaobaoHack {
    limit: number;
    taobaoClient: InstanceType<typeof union.taobao.Client>;

    constructor(client: InstanceType<typeof union.taobao.Client>, limit: number = 10) {
        this.taobaoClient = client;
        this.limit = limit;
    }

    private equal(left: string, right: string) {
        if (!left || !right) {
            return false;
        }

        return left === right;
    }

    async getGoodsById(goodsId: string, adzoneId: string, tmall: boolean = false, precise: boolean = true) {
        let goodsLink;
        if (tmall) {
            goodsLink = `https://detail.tmall.com/item.htm?id=${goodsId}`;
        } else {
            goodsLink = `https://item.taobao.com/item.htm?id=${goodsId}`;
        }

        const goodsResult = await this.taobaoClient.execute('taobao.tbk.dg.material.optional', { q: goodsLink, adzone_id: adzoneId });
        if (goodsResult.error) {
            return goodsResult;
        }

        const goodsInfo = goodsResult.result_list.map_data[0];

        var index = 1;
        let searchList : any[] = [];
        while (true) {
            const searchResult = await this.taobaoClient.execute('taobao.tbk.dg.material.optional', { q: `${goodsInfo.title}.`, adzone_id: adzoneId, page_no: index, page_size: 100, sort: 'match_des' });
            if (searchResult.error) {
                return searchResult;
            }

            const searchInfo = searchResult.result_list.map_data;
            searchList.push.apply(searchList, searchInfo);

            if (searchInfo.length !== 100 || index - 1 >= this.limit) {
                break;
            } else {
                index += 1;
            }
        }

        let goodsResult2, goodsInfo2;
        if (precise) {
            goodsResult2 = await this.taobaoClient.execute('taobao.tbk.dg.material.optional', { q: goodsLink, adzone_id: adzoneId });
            if (goodsResult2.error) {
                return goodsResult2;
            }

            goodsInfo2 = goodsResult2.result_list.map_data[0];
        }

        for (const goods of searchList) {
            /**
             * ??????????????????????????????:
             * 1. ?????? id ???????????? (??????)
             * 2. ??????????????????????????????????????????????????? (?????????)
             * 3. ?????????????????????????????????????????????????????????????????????????????? (?????????)
            */
            if (goods.seller_id === goodsInfo.seller_id && ((this.equal(goods.white_image, goodsInfo.white_image) || this.equal(goods.pict_url, goodsInfo.pict_url)) || (precise && (this.equal(goods.white_image, goodsInfo2.white_image) || this.equal(goods.pict_url, goodsInfo2.pict_url))))) {
                return goods;
            }
        }

        return {
            code: 404,
            message: 'No goods found with given id',
            error: true
        };
    }
}