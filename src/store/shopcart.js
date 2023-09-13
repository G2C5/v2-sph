import { reqGetCartList, reqDeletCartById, reqChangeCheckCartById } from "@/api/index"

export default {
    namespaced: true,
    // 响应行为
    actions: {
        // 获取购物车商品数据
        async getCartList(context, value) {
            let result = await reqGetCartList(value);
            if (result.code == 200) {
                context.commit("GET_CARTLIST", result.data)
            }
        },
        // 删除某个购物车商品
        async deleteCartList(context, skuId) {
            let result = await reqDeletCartById(skuId);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        // 删除全部选中的购物车商品
        deleteAllCheckCart(context, value) {
            let PromiseAll = [];
            context.getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? context.dispatch("deleteCartList", item.skuId) : "";
                PromiseAll.push(promise);
            });
            // PromiseAll.push（element）,其中element全部成功才成功
            return Promise.all(PromiseAll);
        },
        // 切换购物车某个商品选中状态
        async changeCheckCartById(context, { skuId, isChecked }) {
            let result = await reqChangeCheckCartById(skuId, isChecked);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        // 切换购物车全部商品选中状态
        changeIsCheckAllCartById(context, value) {
            let PromiseAll = [];
            console.log(context.state)
            context.state.cartList[0].cartInfoList.forEach(item => {
                let promise = context.dispatch("changeCheckCartById", { skuId: item.skuId, isChecked: value });
                PromiseAll.push(promise);
            });
            return Promise.all(PromiseAll);
        }

    },
    // 操作数据
    mutations: {
        GET_CARTLIST(context, value) {
            context.cartList = value
        }
    },
    // 存储数据
    state: {
        cartList: [],
    },
    // 数据加工【可选】只能计算第一层数据
    getters: {
        // cartInfoList(state) {
        //     return state.cartList[0].cartInfoList || [];
        // },
        cartList(state) {
            return state.cartList[0] || [];
        }
    }
}