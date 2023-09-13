import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"

export default {
    namespaced: true,
    // =========响应行为======
    actions: {
        // 得到三导航
        async getCategoryList(context) {
            let result = await reqGetCategoryList();
            if (result.code == 200) {
                context.commit("GETCATEGORYLIST", result.data)
            }
        },
        // 得到bannerList
        async getBannerList(context) {
            let result = await reqGetBannerList();
            if (result.code == 200) {
                context.commit("GETBANNERLIST", result.data)
            }
        },
        // 得到floorList
        async getFloorList(context) {
            let result = reqGetFloorList();
            if ((await result).code == 200) {
                context.commit("GETFLOORLIST", (await result).data)
            }
        }
    },

    // =========操作数据======
    mutations: {
        GETCATEGORYLIST(state, value) {
            // // splice( 起始下标 , 删除个数 ) 删除数组元素 返回删除元素组成的新数组 影响原数组
            value.splice(-3,)
            state.categoryList = value
        },
        GETBANNERLIST(state, value) {
            state.bannerList = value
        },
        GETFLOORLIST(state, value) {
            state.floorList = value
        }
    },


    // ==========存储数据=======
    state: {
        categoryList: [],
        bannerList: [],
        floorList: [],
    },


    // =========数据加工【可选】========
    getters: {}
}