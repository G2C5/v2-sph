import { reqGetSearchInfo } from "@/api/index"
export default {
    namespaced: true,
    // 响应行为
    actions: {
        async getSearchList(context, value = {}) {
            let result = await reqGetSearchInfo(value);
            if (result.code == 200) {
                context.commit("GET_SEARCHLIST", result.data)
            }
        }
    },
    // 操作数据
    mutations: {
        GET_SEARCHLIST(context, value) {
            context.searchList = value
        }
    },
    // 存储数据
    state: {
        searchList: {}
    },
    // 数据加工【可选】
    getters: {
        goodsList(context) {
            return context.searchList.goodsList || [];
        },
        trademarkList(context) {
            return context.searchList.trademarkList || [];
        },
        attrsList(context) {
            return context.searchList.attrsList || [];
        }
    }
}