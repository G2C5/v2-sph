import Vue from 'vue'
import App from './App.vue'
// 全局组件
import Header from './components/header'
import TypeNav from './components/typenav'
import Footer from './components/footer'
import Carousel from './components/carousel'
import PageNation from './components/pagenation'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//注册路由功能
import router from './router';
//引入store
import store from './store'
//引入swiper轮播图样式
import "swiper/css/swiper.css"
//统一引入API接口
import * as API from '@/api';
// 引入assets图片
import atm from '@/assets/loadimage.gif'
// 自定义插件
import myplugins from './plugins/myplugins'
import "@/plugins/validate";

// import { reqGetGoodsDetailInfo, reqGetSearchInfo, reqGetCartList } from './api/index'
// console.log('reqGetSearchInfo({})', reqGetSearchInfo({}))
// reqGetGoodsDetailInfo("10") 
// ele-ui
import { Button, Row, Col, MessageBox, Message, Input } from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input)
// 图片懒加载
Vue.use(VueLazyload, {
  loading: atm,
})
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//element-ui消息提示框
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
// 全局注册组件
Vue.component(Header.name, Header)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Footer.name, Footer)
Vue.component(Carousel.name, Carousel)
Vue.component(PageNation.name, PageNation)
// Vue.prototype.$alert = MessageBox.alert;

// 注册自定义插件
Vue.use(myplugins);
Vue.config.productionTip = false

// 引入模拟数据
import '@/mock/mockServer'

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;

  }
}).$mount('#app')
