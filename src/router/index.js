//配置路由
//第一步：引入插件、安装插件
import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
//引入路由相关的配置项
import routes from './routes'
// 获取仓库token来判断登录状态，路由前置守卫决定是否放行
import store from "@/store";
import { removeToken } from "@/utils/token";

// vue-router 实例上的 push 方法返回的是 promise 对象，所以传入的参数期望有一个成功和失败的回调，如果省略不写则会报错。
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// reslove成功回调，reject失败回调
VueRouter.prototype.push = function (location, reslove, reject) {
    if (reslove && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.push = function (location, reslove, reject) {
    if (reslove && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//第二步:暴露VueRouter类的实例
//对外暴露一个路由器,实质是VueRouter类的实例,一个路由器可以管理多个路由
let router = new VueRouter({
    //配置路由
    routes,
    //设置滚动条的位置
    scrollBehavior() {
        //滚动行为这个函数,需要有返回值,返回值为一个对象。
        //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
        return { y: 0 };
    }
});

// 全局前置守卫 to去哪里、from来自哪里、next(path)放行到哪里
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 1. 登录状态 ？ 已登录步骤2 ：没有放行去登录
    if (token) {
        // 2. 已登录 ？ 登录不放行 ：未登录步骤 3
        console.log('2')
        if (to.path == "/login") {
            console.log('3')
            next('/home')
        } else {
            // 3. 未登录步骤 用户信息存 ? 放行 : 发送请求
            console.log('4')
            if (name) {
                console.log('5')
                next();
            } else {
                try {
                    console.log('token失效1')
                    await store.dispatch('user/checkToken');
                    next();
                }
                catch (error) {
                    // token失效
                    console.log('token失效2')
                    await store.dispatch('user/userLogin');
                    // removeToken('TOKEN')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path;
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
        // next()

    }
    // if (store.state.user.token) {
    //     next('/')
    // } else {
    //     next()
    // }
})



export default router;