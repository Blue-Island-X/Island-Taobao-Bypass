const union = require('@blueislandx/island-union-sdk');
const taobao = require('../../island-taobao-bypass');

const client = new union.taobao.Client({
    appKey: '********',
    secretKey: '********************************'
});
const hack = new taobao.TaobaoHack(client);

hack.getGoodsIdV2('668674364464', '************').then(result => {
    console.log(result.item_id);
})