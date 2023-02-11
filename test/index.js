const island = require('island-union-sdk');
const taobao = require('../../island-taobao-bypass');

const client = new island.taobao.Client({
    appKey: '********',
    secretKey: '********************************'
});
const hack = new taobao.TaobaoHack(client);

hack.getGoodsIdV2('668674364464', '************').then(result => {
    console.log(result.goodsIdV2);
})