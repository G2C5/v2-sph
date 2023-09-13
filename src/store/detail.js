import { reqGetGoodsDetailInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"
export default {
    namespaced: true,
    // 响应行为
    actions: {
        // 获取搜索模块数据 value 至少是一个空对象
        async getGoodsDetailList(context, value) {
            let result = await reqGetGoodsDetailInfo(value)
            if (result.code == 200) {
                context.commit("GET_GOODSDETAILLIST", result.data)
            }
        },
        // 商品添加购物车
        async addOrUpdateShopCart(context, value) {
            let result = await reqAddOrUpdateShopCart(value.skuId, value.skuNum);
            if (result.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
    },
    // 操作数据
    mutations: {
        GET_GOODSDETAILLIST(context, value) {
            context.goodsDetailInfo = value
        }
    },
    // 存储数据
    state: {
        goodsDetailInfo: {},
        uuid_token: getUUID()
    },
    // 数据加工【可选】
    getters: {
        // 路径导航信息
        categoryView(state) {
            return state.goodsDetailInfo.categoryView || { category1Name: "模拟1", category3Name: "模拟3" }
        },
        // 产品信息
        skuInfo(state) {
            return state.goodsDetailInfo.skuInfo || {}
        },
        // 商品参数
        spuSaleAttrList(state) { return state.goodsDetailInfo.spuSaleAttrList }
    }

}