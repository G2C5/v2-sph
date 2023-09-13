//对于axios进行二次封装
import axios from "axios";
//引入进度条和css
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
// 引入store
import store from "@/store";

//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/api",
    //超时的设置
    timeout: 5000
});

// 添加请求拦截器:  将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use(config => {
    console.log('request--success')
    // 进度条开始
    NProgress.start()
    // 判断零时身份
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    return config;
});
// 添加响应拦截器
requests.interceptors.response.use((res) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log('response--success')
    // 进度条结束
    NProgress.done()
    return res.data
}, (err) => {
    console.log('error')
    return Promise.reject(err)
});


export default requests;




