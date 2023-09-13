<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 离开得到cateGoryindex,进入控制展示 -->
            <div @mouseleave="getLeveIndex" @mouseenter="showAllCategory">
                <h2 class="all">全部商品分类</h2>
                <!-- 过度动画 -->
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <!-- goSerach事件委派 -->
                        <div class="all-sort-list2" @click="goSerach($event)">
                            <!-- 一级导航 -->
                            <div class="item" v-for="(cOne, cOneIndex ) in  category " :key="cOne.categoryId"
                                :class="{ cur: cOneIndex == categoryIndex }">
                                <h3 @mouseenter="getEnterIndex(cOneIndex)">
                                    <a :data-categoryName="cOne.categoryName" :data-categoryOneId="cOne.categoryId">{{
                                        cOne.categoryName }}</a>
                                </h3>
                                <!-- 二级导航 -->
                                <!-- js代码显示与隐藏 -->
                                <div class="item-list clearfix"
                                    :style="{ display: cOneIndex == categoryIndex ? 'block' : 'none' }">
                                    <div class="subitem" v-for="( cTwo ) in  cOne.categoryChild " :key="cTwo.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="cTwo.categoryName"
                                                    :data-categoryTwoId="cTwo.categoryId">{{
                                                        cTwo.categoryName }}</a>
                                            </dt>
                                            <!-- 三级导航 -->
                                            <dd>
                                                <em v-for="( cThree ) in  cTwo.categoryChild " :key="cThree.categoryId">
                                                    <a :data-categoryName="cThree.categoryName"
                                                        :data-categoryThreeId="cThree.categoryId">{{ cThree.categoryName
                                                        }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>

import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
    name: "TypeNav",
    data() {
        return {
            categoryIndex: -1,
            isShow: false,// 默认展示
        }
    },
    mounted() {
        // console.log("isShow", !this.$route.path.startsWith("/search"))
        // 如果是serach隐藏全部商品，鼠标悬停展开,不是就展示
        // if (this.$route.path.startsWith("/search")) {
        //     this.isShow = true
        // } else {
        //     this.isShow = false
        // }
        if (this.$route.path == "/home") {
            this.isShow = true;
        }
        console.log("--------", this.isShow)
    },
    computed: {
        ...mapState({
            //对象写法,对象的K,给VC新增的属性
            //新增的属性erha,右侧属性值为箭头函数返回的结果。作为新增属性的属性值
            //箭头函数执行，注入一个参数state->大仓库【包含小仓库】
            category: (state) => state.home.categoryList, //对象简写形式
        }),
    },
    methods: {
        // 鼠标进入全部商品分类
        getEnterIndex: throttle(function (index) {
            this.categoryIndex = index
            // console.log(this.categoryIndex)
        }, 10),
        // 鼠标离开隐藏全部商品分类
        getLeveIndex() {
            console.log("鼠标离开" + this.$route.path)
            this.categoryIndex = -1
            // 在serach页鼠标离开展示全部商品导航
            // if (this.$route.path.startsWith("/search")) {
            if (!this.$route.path.startsWith("/home")) {
                this.isShow = false
            }
        },
        // 鼠标进入展示全部商品分类
        showAllCategory() {

            console.log("鼠标进入" + this.$route.path)
            // 在serach页鼠标移入展示全部商品导航
            // if (this.$route.path.startsWith("/search")) {
            if (!this.$route.path.startsWith("/home")) {
                this.isShow = true
            }
        },
        // 跳转到serach并得到传递的参数（导航栏参数、用户搜索参数）
        goSerach(event) {
            // 根据自定义属性得到a标签，和a标签导航等级
            let element = event.target
            let { categoryname, categoryoneid, categorytwoid, categorythreeid } = element.dataset
            console.log('导航名:' + categoryname, '一' + categoryoneid, '二:' + categorytwoid, '三:' + categorythreeid)
            // 传递的参数
            let location = { name: 'search' }
            let query = { categoryName: categoryname }
            let params = this.$route.params
            // 确定a标签 和 三级导航分支传参
            if (categoryname) {
                if (categoryoneid) {
                    query.category1Id = categoryoneid;
                } else if (categorytwoid) {
                    query.category2Id = categorytwoid;
                } else {
                    query.category3Id = categorythreeid;
                }
            }
            // 合并参数完成跳转
            location.query = query
            location.params = params
            this.$router.push(location)
            /*   this.$router.push({
                  name: "search",
                  params: {
                      paramsvalue: 'sdf'
                  },
                  query: {
                      keyWord: this.keyWord
                  }
              }) */
        },
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;


            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        // 使用鼠标进入和离开js实现
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                // 添加背景
                .cur {
                    background-color: #0ee;
                }
            }
        }

        // 过度动画
        .sort-enter {
            height: 0px;
        }

        .sort-enter-to {
            height: 461px;
        }

        .sort-enter-active {
            transition: all .5s linear;
            overflow: hidden;
        }
    }
}
</style>