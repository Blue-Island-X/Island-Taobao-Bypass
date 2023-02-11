# 小蓝岛淘宝商品数字 id 转联盟字符 id 解决方案 (开源版)
## 1.前情提要

淘宝联盟必须使用新版的联盟字符 id 进行传参来获取商品信息，但是淘宝联盟官方不肯开放转换接口权限给不是比价场景的应用  

![淘宝联盟官方私聊回复](https://raw.githubusercontent.com/Blue-Island-X/Island-Taobao-Hack/master/resource/DingTalk_oFr6NmYFGf.png)

每天钉钉群里都有大量淘客反馈该问题，大家都表示看不懂文档了

![淘宝联盟钉钉群消息](https://raw.githubusercontent.com/Blue-Island-X/Island-Taobao-Hack/master/resource/DingTalk_m18wT28Apm.png)

群里每天都有人加群去问这个问题，可淘宝联盟官方却一直重复一个回答

![淘宝联盟官方群回复](https://raw.githubusercontent.com/Blue-Island-X/Island-Taobao-Hack/master/resource/DingTalk_IJUUALakAc.png)

大家集思广益想出了申请比价工具商就可以进行转换了，结果淘宝官方出了[场景ID权限预警](https://qn.taobao.com/headline/news/10695294?spm=a211vu.12026430.0.0.1fff3929wEYil2)进行反制

![淘宝联盟场景权限预警](https://raw.githubusercontent.com/Blue-Island-X/Island-Taobao-Hack/master/resource/DingTalk_jFVoegeB6w.png)

我还是最喜欢这位老哥的话，属实说了我不敢说的

![淘宝联盟牛逼老哥](https://raw.githubusercontent.com/Blue-Island-X/Island-Taobao-Hack/master/resource/DingTalk_urNiroEBPT.png)

~~所以说群友们的攻击性有待提高，素质有待降低~~

## 2.实现原理

一位群友在群里发了一张图片, 通过直接搜索链接可以返回商品信息但是不会返回商品 id 和链接

![淘宝联盟官方群友方法](https://raw.githubusercontent.com/Blue-Island-X/Island-Taobao-Hack/master/resource/DingTalk_YgbzJ7xGTW.png)

我们可以通过短标题 ``short_title`` 进行搜索，再根据卖家标识符 ``seller_id`` 再加上大图链接 ``pict_url`` 或者白底图链接 ``white_image`` 做一个匹配

> P.S: 精确标题无法使用，淘宝联盟会不返回商品 id 等信息

## 3.如何安装

```
npm i island-taobao-bypass --save
```

> P.S: 本项目依赖于 [Island-Union-SDK](https://github.com/Blue-Island-X/Island-Union-SDK)

## 4.如何使用

```TypeScript
import island from 'island-union-sdk';
import taobao from 'island-taobao-bypass';

const client = new island.taobao.Client({
    appKey: '<你的 AppKey>',
    secretKey: '<你的 SecretKey>'
});
const hack = new taobao.TaobaoHack(client);

const result = await hack.getGoodsById('<商品数字 id>', '<你的广告位 id>', <是否是天猫商品 (默认为否)>, <是否开启精确模式 (默认为是)>);
```

> P.S: 在精确模式中, 会请求商品信息两次 (避免低概率的白底图或者主图更换导致匹配不到商品的问题)

## 5.注意事项

在 1.0.1 以及之后版本中, **整个商品**的信息都会被返回, 不再单独返回商品 id  

数据结构可以参考该链接: https://open.taobao.com/api.htm?docId=35896&docType=2