"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaobaoHack = void 0;
class TaobaoHack {
    constructor(client) {
        this.taobaoClient = client;
    }
    async getGoodsById(goodsId, adzoneId, precise = true) {
        const goodsLink = `https://item.taobao.com/item.html?id=${goodsId}`;
        const goodsResult = await this.taobaoClient.execute('taobao.tbk.dg.material.optional', { q: goodsLink, adzone_id: adzoneId });
        if (goodsResult.error) {
            return goodsResult;
        }
        const goodsInfo = goodsResult.result_list.map_data[0];
        var index = 1;
        let searchList = [];
        while (true) {
            const searchResult = await this.taobaoClient.execute('taobao.tbk.dg.material.optional', { q: goodsInfo.short_title, adzone_id: adzoneId, page_no: index, page_size: 100 });
            if (searchResult.error) {
                return searchResult;
            }
            const searchInfo = searchResult.result_list.map_data;
            searchList.push.apply(searchList, searchInfo);
            if (searchInfo.length !== 100) {
                break;
            }
            else {
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
             * 是否是同一商品的条件:
             * 1. 店铺 id 是否相等 (必须)
             * 2. 商品白底图或主图与第一次搜索的相同 (或运算)
             * 3. 开启精确模式并且商品白底图或或主图与第二次搜索的相同 (或运算)
            */
            if (goods.seller_id === goodsInfo.seller_id && ((goods.white_image === goodsInfo.white_image || goods.pict_url === goodsInfo.pict_url) || (precise && (goods.white_image === goodsInfo2.white_image || goods.pict_url === goodsInfo2.pict_url)))) {
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
exports.TaobaoHack = TaobaoHack;
