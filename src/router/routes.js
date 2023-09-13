// 引入路由相关组件
// import home from '../views/home'
import search from "../views/search"
import Login from "../views/Login"
import Register from "../views/Register"
// 商品详情页面
import Detail from '../views/Detail'
// 添加购物车
import AddCartSuccess from '../views/AddCartSuccess'
// 购物车
import ShopCart from '../views/ShopCart'
// 商品结算界面
import Trade from '../views/Trade';
// 支付页面
import Pay from '../views/Pay'
// 支付成功页
import PaySuccess from '../views/PaySuccess'
// 个人中心
// import Center from '../views/Center'
// 二级路由【我的订单、购物订单】
import MyOrder from '../views/Center/myOrder'
import GroupOrder from '../views/Center/groupOrder'

// 路由懒加载（缓存）
// const foo = () => {
//     return import('@/views/home')
// }


export default [
    {
        name: 'center',
        path: '/center',
        component: () => import('../views/Center'),
        meta: {
            isShow: true
        },
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder,
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: {
            isShow: true
        },
        /* beforeEnter: (to, from, next) => {
            // 登录后用户不能通过/pay路径跳转支付完成页
            if (from.path == '/pay') {
                // 只能从特定页面跳转到支付完成页面
                alert('付钱了过吧！')
                next()
            } else {
                alert('钱都没付！！！');
                next(false); //停留当前
            }
        } */
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: {
            isShow: true
        },
        beforeEnter: (to, from, next) => {
            // 登录后用户不能通过/pay路径跳转支付完成页
            if (from.path == '/shopcart') {
                // 只能从特定页面跳转到支付完成页面
                alert('给钱了！！！')
                next()
            } else {
                alert('钱多？？？')
                next(false); //停留当前
            }
        }
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('../views/home'),
        meta: {
            isShow: true
        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: {
            isShow: true
        }
    },
    {
        name: 'search',
        // path: '/serach/:paramsvalue',
        path: '/search/:keyword?',
        component: search,
        meta: {
            isShow: true
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid?',
        component: Detail,
        meta: { isShow: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            isShow: true
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: {
            isShow: true
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isShow: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            isShow: false
        }
    },
    //重定向到首页
    {
        path: '/',
        redirect: '/home'
    }
]