<template>
    <!-- 项目的最外层 -->
    <div class="outer">
        <!-- 头部 -->
        <TypeNav />
        <!-- <div style="width:100%;height :3000px;background-color: #e88;"> -->
        <!-- <h4>query:{{ $route.query.keyWord }}</h4>
        <h4>params:{{ $route.params.paramsvalue }}</h4> -->
        <!-- 窗口侧边栏 -->
        <Toolbar />
        <!--list-content-->
        <div class="main">
            <div class="py-container">
                <!--bread 面包屑-->
                <div class="bread">
                    <ul class="fl sui-breadcrumb">
                        <li>
                            <a href="#">全部结果</a>
                        </li>
                    </ul>
                    <ul class="fl sui-tag">
                        <!-- 导航栏面包屑 -->
                        <li class="with-x" v-if="searchParams.categoryName" @click="removeCategoryName">{{
                            searchParams.categoryName }}<i>×</i></li>
                        <!-- 关键字面包屑 -->
                        <li class="with-x" v-if="searchParams.keyword" @click="removeKeyWord">{{
                            searchParams.keyword }}<i>×</i></li>
                        <!-- 品牌面包屑 -->
                        <li class="with-x" v-if="searchParams.trademark" @click="removeTrademark">{{
                            searchParams.trademark.split(":")[1] }}<i>×</i></li>
                        <!-- 参数面包屑 -->
                        <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index"
                            @click="removeAttrInfo(index)">{{
                                attrValue.split(":")[1] }}<i>×</i></li>
                    </ul>
                </div>
                <!-- selector -->
                <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />
                <!-- 排序--details-->
                <div class="details clearfix">
                    <div class="sui-navbar">
                        <div class="navbar-inner filter">
                            <ul class="sui-nav">
                                <li :class="{ active: isOneOrTwo }" @click="changeOrder('1')">
                                    <a href="#">综合<span v-show="isOneOrTwo && isDescOrAsc">▼</span><span
                                            v-show="!isDescOrAsc && isOneOrTwo">▲</span></a>
                                </li>
                                <li :class="{ active: !isOneOrTwo }" @click="changeOrder('2')">
                                    <a href=" #">价格<span v-show="!isOneOrTwo && isDescOrAsc">▼</span><span
                                            v-show="!isDescOrAsc && !isOneOrTwo">▲</span></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-5" v-for="(  good  ) in   goodsList  " :key="good.id">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <router-link :to="`/detail/${good.id}`" target="_blank"><img
                                                v-lazy="good.defaultImg" /></router-link>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥ </em>
                                            <i>{{ good.price }}</i>
                                        </strong>
                                    </div>
                                    <div class="attr">
                                        <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有<span>2000</span>人评价</i>
                                    </div>
                                    <div class="operate">
                                        <a href="success-cart.html" target="_blank"
                                            class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 分页器 -->
                    <PageNation @getPageNo="getPageNo" :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize"
                        :total="total" :continues="5" />
                    <!-- <PageNation @getPageNo="getPageNo" :pageNo="searchParams.pageNo" :pageSize="3" :total="91"
                        :continues="5" /> -->
                </div>
                <h1><router-link :to="`/detail/${5}`">hhhhhh</router-link></h1>
                <!-- 热门商品销售列表 hotsale-->
                <div class="clearfix hot-sale">
                    <h4 class="title">热卖商品</h4>
                    <div class="hot-list">
                        <ul class="yui3-g">
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_01.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_03.png" />
                                    </div>
                                    <div class="attr">
                                        <em>金属A面，360°翻转，APP下单省300！</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_04.png" />
                                    </div>
                                    <div class="attr">
                                        <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4068.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有20人评价</i>
                                    </div>
                                </div>
                            </li>
                            <li class="yui3-u-1-4">
                                <div class="list-wrap">
                                    <div class="p-img">
                                        <img src="./images/like_02.png" />
                                    </div>
                                    <div class="attr">
                                        <em>Apple苹果iPhone 6s (A1699)</em>
                                    </div>
                                    <div class="price">
                                        <strong>
                                            <em>¥</em>
                                            <i>4088.00</i>
                                        </strong>
                                    </div>
                                    <div class="commit">
                                        <i class="command">已有700人评价</i>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchSelector from './searchselector'
import { mapGetters, mapState } from 'vuex'
import Toolbar from './toolbar'

export default {
    name: "Search",
    components: {
        Toolbar, SearchSelector
    },
    data() {
        return {
            // 返回服务器数据
            searchParams: {
                // 一、二、三级导航id
                "category1Id": "",
                "category2Id": "",
                "category3Id": "",
                //一、二、三级导航分类名字
                "categoryName": "",
                //用户输入
                "keyword": "",
                //排序:综合【1】、价格【2】：desc【降序】、asc【升序】
                "order": "1:desc",
                //当前分页
                "pageNo": '1',
                //展示数据数
                "pageSize": '5',
                //售卖属性携带参数
                "props": [],
                //手机品牌
                "trademark": ""
            },
        }
    },
    beforeMount() {
        // 合并对象
        let params = Object.assign(this.searchParams, this.$route.query, this.$route.params);
        console.log("search beforemount params:", params)
    },
    mounted() {
        this.getData()
    },
    computed: {
        ...mapGetters('search', ['goodsList']),
        // 判断是否【品牌排序】【价格排序】
        isOneOrTwo() { return this.searchParams.order.indexOf('1') != -1 },
        // 判断是否【升序】【降序】
        isDescOrAsc() { return this.searchParams.order.indexOf('desc') != -1 },
        //得到仓库total：总数据条目
        ...mapState({ total: state => state.search.searchList.total })
    },
    methods: {
        // 发送post请求，携带参数，获取搜索的手机信息
        getData() {
            // console.log("search--发送请求方法：", this.searchParams);
            this.$store.dispatch('search/getSearchList', this.searchParams)
        },
        // 面包屑去除(导航栏)
        removeCategoryName() {
            // 设置undefined不会返回给服务器
            this.searchParams.categoryName = undefined
            this.searchParams.category1Id = undefined
            this.searchParams.category2Id = undefined
            this.searchParams.category3Id = undefined
            this.getData()
            // 路由跳转实现简洁地址栏（保留params参数）
            this.$router.push({ name: "search", params: this.$route.params })
        },
        // 面包屑去除(关键字)
        removeKeyWord() {
            this.searchParams.keyword = undefined
            this.getData()
            // 通知清楚关键字
            this.$bus.$emit("clearKeyWord")
            // 路由跳转实现简洁地址栏（保留query参数）
            this.$router.push({ name: "search", query: this.$route.query })
        },
        // 面包屑去除(品牌)
        removeTrademark() {
            this.searchParams.trademark = undefined
            this.getData()
        },
        // 面包屑去除(品牌参数)
        removeAttrInfo(index) {
            this.searchParams.props.splice(index, 1);
            this.getData()
        },
        // 父组件自定义事件回调(接受品牌参数)【小米、苹果、华为......】
        trademarkInfo(trademark) {
            // 携带参数
            this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
            console.log('自定义事件回调', trademark)
            // 发送请求
            this.getData()
        },
        // 父组件自定义事件回调(接受品牌具体参数)【2G、3G、8G、4500mAh......】
        attrInfo(attr, attrValue) {
            console.log("attr", attr, attrValue)
            // 整理请求携带的参数
            let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
            // 去重携带的参数
            if (this.searchParams.props.indexOf(props) == -1) {
                this.searchParams.props.push(props)
            }
            // 发送请求
            this.getData()

        },
        // 商品排序 // 排序参数修改
        changeOrder(flag) {
            /*  排序:综合【1】、价格【2】：desc【降序】、asc【升序】
                "order": "1:desc", */
            let oruginOrder = this.searchParams.order.split(":");
            let originFlag = oruginOrder[0]; // 1或2  判断是否高亮
            let originSortType = oruginOrder[1];// desc或asc 判断排序状态
            let newOrder = '';

            console.log('star', this.searchParams.order)
            if (flag == oruginOrder[0]) {
                newOrder = `${originFlag}:${originSortType == "desc" ? "asc" : "desc"}`;
            } else {
                newOrder = `${flag}:desc`;
            }
            this.searchParams.order = newOrder;
            this.getData()
        },
        // 父组件自定义事件回调(接受分页器当前页数)
        getPageNo(pageno) {
            this.searchParams.pageNo = pageno
            this.getData()
        },
    },
    watch: {
        // 监视路由，发送请求
        $route(newValue, oldValue) {
            // 清空上次记录
            this.searchParams.category1Id = ""
            this.searchParams.category2Id = ""
            this.searchParams.category3Id = ""
            // 发请求前合并给服务器的参数
            Object.assign(this.searchParams, this.$route.query, this.$route.params)
            // 
            this.getData()
        }
    }
}
</script>

<style lang="less" scoped>
.main {
    margin: 10px 0;

    .py-container {
        width: 1200px;
        margin: 0 auto;

        .bread {
            margin-bottom: 5px;
            overflow: hidden;

            .sui-breadcrumb {
                padding: 3px 15px;
                margin: 0;
                font-weight: 400;
                border-radius: 3px;
                float: left;

                li {
                    display: inline-block;
                    line-height: 18px;

                    a {
                        color: #666;
                        text-decoration: none;

                        &:hover {
                            color: #4cb9fc;
                        }
                    }
                }
            }

            .sui-tag {
                margin-top: -5px;
                list-style: none;
                font-size: 0;
                line-height: 0;
                padding: 5px 0 0;
                margin-bottom: 18px;
                float: left;

                .with-x {
                    font-size: 12px;
                    margin: 0 5px 5px 0;
                    display: inline-block;
                    overflow: hidden;
                    color: #000;
                    background: #f7f7f7;
                    padding: 0 7px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #dedede;
                    white-space: nowrap;
                    transition: color 400ms;
                    cursor: pointer;

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                        font: 400 14px tahoma;
                        display: inline-block;
                        height: 100%;
                        vertical-align: middle;
                    }

                    &:hover {
                        color: #28a3ef;
                    }
                }
            }
        }

        .details {
            margin-bottom: 5px;

            .sui-navbar {
                overflow: visible;
                margin-bottom: 0;

                .filter {
                    min-height: 40px;
                    padding-right: 20px;
                    background: #fbfbfb;
                    border: 1px solid #e2e2e2;
                    padding-left: 0;
                    border-radius: 0;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

                    .sui-nav {
                        position: relative;
                        left: 0;
                        display: block;
                        float: left;
                        margin: 0 10px 0 0;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                display: block;
                                cursor: pointer;
                                padding: 11px 15px;
                                color: #777;
                                text-decoration: none;
                            }

                            &.active {
                                a {
                                    background: #e1251b;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }

            .goods-list {
                margin: 20px 0;

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        height: 100%;
                        width: 20%;
                        margin-top: 10px;
                        line-height: 28px;

                        .list-wrap {
                            .p-img {
                                padding-left: 15px;
                                width: 215px;
                                height: 255px;

                                a {
                                    color: #666;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                        vertical-align: middle;
                                    }
                                }
                            }

                            .price {
                                padding-left: 15px;
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .attr {
                                padding-left: 15px;
                                width: 85%;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;

                                a {
                                    color: #333;
                                    text-decoration: none;
                                }
                            }

                            .commit {
                                padding-left: 15px;
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;

                                span {
                                    font-weight: 700;
                                    color: #646fb0;
                                }
                            }

                            .operate {
                                padding: 12px 15px;

                                .sui-btn {
                                    display: inline-block;
                                    padding: 2px 14px;
                                    box-sizing: border-box;
                                    margin-bottom: 0;
                                    font-size: 12px;
                                    line-height: 18px;
                                    text-align: center;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    border-radius: 0;
                                    background-color: transparent;
                                    margin-right: 15px;
                                }

                                .btn-bordered {
                                    min-width: 85px;
                                    background-color: transparent;
                                    border: 1px solid #8c8c8c;
                                    color: #8c8c8c;

                                    &:hover {
                                        border: 1px solid #666;
                                        color: #fff !important;
                                        background-color: #666;
                                        text-decoration: none;
                                    }
                                }

                                .btn-danger {
                                    border: 1px solid #e1251b;
                                    color: #e1251b;

                                    &:hover {
                                        border: 1px solid #e1251b;
                                        background-color: #e1251b;
                                        color: white !important;
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }


        }

        .hot-sale {
            margin-bottom: 5px;
            border: 1px solid #ddd;

            .title {
                font-weight: 700;
                font-size: 14px;
                line-height: 21px;
                border-bottom: 1px solid #ddd;
                background: #f1f1f1;
                color: #333;
                margin: 0;
                padding: 5px 0 5px 15px;
            }

            .hot-list {
                padding: 15px;

                ul {
                    display: flex;

                    li {
                        width: 25%;
                        height: 100%;

                        .list-wrap {

                            .p-img,
                            .price,
                            .attr,
                            .commit {
                                padding-left: 15px;
                            }

                            .p-img {
                                img {
                                    max-width: 100%;
                                    vertical-align: middle;
                                    border: 0;
                                }
                            }

                            .attr {
                                width: 85%;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                                overflow: hidden;
                                margin-bottom: 8px;
                                min-height: 38px;
                                cursor: pointer;
                                line-height: 1.8;
                            }

                            .price {
                                font-size: 18px;
                                color: #c81623;

                                strong {
                                    font-weight: 700;

                                    i {
                                        margin-left: -5px;
                                    }
                                }
                            }

                            .commit {
                                height: 22px;
                                font-size: 13px;
                                color: #a7a7a7;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>