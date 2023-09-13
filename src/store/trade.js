import { reqUserAddressList, reqTradeInfo } from "@/api"

export default {
    namespaced: true,
    actions: {
        // 商品结算 地址信息
        async getUserAddressList(context, value) {
            let result = await reqUserAddressList();
            if (result.code == 200) {
                context.commit('GET_USER_ADDRESS_LIST', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.massage}`))
            }
        },
        // 商品结算 交易商品信息
        async getTradeInfo(context, value) {
            let result = await reqTradeInfo();
            if (result.code == 200) {
                context.commit('GET_TRADE_INFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.massage}`))
            }
        },
    },
    mutations: {
        GET_USER_ADDRESS_LIST(context, value) {
            context.addressList = value
        },
        GET_TRADE_INFO(context, value) {
            context.tradeInfo = value
        }

    },
    state: {
        addressList: [],
        tradeInfo: {},
    },
    getters: {
        detailArrayList(state) {
            return state.tradeInfo.detailArrayList || {};
        }
    }

}