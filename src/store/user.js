import { reqGetCode, reqUserRegister, reqUserLogin, reqCheckToken, reqLogout } from "@/api/index"
import { setToken, getToken, removeToken } from "@/utils/token";
export default {
    namespaced: true,
    // 响应行为
    actions: {
        // 获取验证码
        async getCode(context, phone) {
            let result = await reqGetCode(phone);
            if (result.code == 200) {
                context.commit("GET_CODE", result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        // 注册
        async userRegister(context, data) {
            let result = await reqUserRegister(data);
            if (result.code == 200) {
                // context.commit("USER_REGISTER", result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`));
            }
        },
        // 登录
        async userLogin(context, data) {
            let result = await reqUserLogin(data);
            if (result.code == 200) {
                context.commit("USER_LOGIN", result.data.token);
                // 本地存储toke
                setToken(result.data.token);
                return 'ok'
            } else {
                removeToken("TOKEN")
                return Promise.reject(new Error(`${result.message}`));
            }
        },
        // 验证token获取用户信息
        async checkToken(context, value) {
            let result = await reqCheckToken();
            if (result.code == 200) {
                context.commit("CHECK_TOKEN", result.data);
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`));
            }
        },
        // 退出登录
        async userLogout(context, value) {
            let result = await reqLogout();
            if (result.code == 200) {
                context.commit("CLEAR_TOKEN");
                return 'ok'
            } else {
                return Promise.reject(new Error(`${result.message}`));
            }
        },

    },
    // 操作数据
    mutations: {
        GET_CODE(context, value) {
            context.code = value;
        },
        USER_LOGIN(context, value) {
            context.token = value;
        },
        CHECK_TOKEN(context, value) {
            context.userInfo = value
        },
        CLEAR_TOKEN(context) {
            context.token = '';
            context.userInfo = '';
            removeToken("TOKEN");
        }
    },
    // 存储数据
    state: {
        code: "",
        token: getToken('TOKEN'),
        userInfo: {},
    },
    // 数据加工【可选】只能计算第一层数据
    getters: {

    }
}