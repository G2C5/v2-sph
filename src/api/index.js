//统一管理项目前部的接口
import requests from "./ajax";
import mockRequests from './mockAjax'

// axios
// 三级导航数据
export const reqGetCategoryList = () => {
    return requests({ url: '/api/product/getBaseCategoryList', method: 'get' });
}
// mock bannerList home页面主轮播图
export const reqGetBannerList = () => {
    return mockRequests.get('/banner')
}
// mock floorList home页面小轮播图
export const reqGetFloorList = () => {
    return mockRequests.get('/floor')
}
// 搜索 post /api/list? params参数至少是一个空对象
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = (params) => {
    return requests({
        url: '/api/list',
        method: 'post',
        data: params
    })
}
// 商品详情页面 get 根据商品id
export const reqGetGoodsDetailInfo = (skuid) => {
    return requests({ url: `/api/item/${skuid}`, method: 'get' })
}
// 加入购物车验证 修改商品个数的接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({ url: `/api/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
}
// 购物车列表接口数据 /api/cart/cartList
export const reqGetCartList = () => {
    return requests({ url: '/api/cart/cartList', method: 'get' });
}
// 删除购物车商品接口 /api/cart/deleteCart/{skuId}
export const reqDeletCartById = (skuId) => requests({ url: `/api/cart/deleteCart/${skuId}`, method: 'delete' });

// 修改切换商品选中状态  /api/cart/checkCart/{skuId}/{isChecked}
export const reqChangeCheckCartById = (skuId, isChecked) => requests({ url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

// 获取验证码 /api/user/passport/sendCode/{ phone }     get
export const reqGetCode = (phone) => requests({ url: `/api/user/passport/sendCode/${phone}`, method: 'get' });

// 注册 /api/user/passport/register   post==phone\password\code
export const reqUserRegister = (userData) => requests({ url: `/api/user/passport/register`, data: userData, method: 'post' })

// 登录 /api/user/passport/login   post
export const reqUserLogin = (data) => requests({ url: `/api/user/passport/login`, data, method: 'post' })

// 验证token  /api/user/passport/auth/getUserInfo  get
export const reqCheckToken = () => requests({ url: `/api/user/passport/auth/getUserInfo`, method: 'get' })

// 退出登录 /api/user/passport/logout get
export const reqLogout = () => requests({ url: '/api/user/passport/logout', method: 'get' });

// 获取商品结算页面 用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqUserAddressList = () => requests({ url: '/api/user/userAddress/auth/findUserAddressList', method: 'get' });


// 获取商品结算页面 商品交易信息 /api/order/auth/trade get
export const reqTradeInfo = () => requests({ url: '/api/order/auth/trade', method: 'get' });


// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}     POST
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });


// 获取支付订单信息 /api/payment/weixin/createNative/{orderId}
export const reqCreateNative = (orderId) => requests({ url: `/api/payment/weixin/createNative/${orderId}`, method: 'get' });

// 查询订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqQuerypayStatus = (orderId) => requests({ url: `/api/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

// 获取我的订单列表  /api/order/auth/{page}/{limit}  grt
export const reqMyOrderList = (page, limit) => requests({ url: `/api/order/auth/${page}/${limit}`, method: 'get' });