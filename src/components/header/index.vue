<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{ userName }}</a>
            <a class="register" @click="Logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home" target="_blank">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSerach"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  mounted() {
    this.$bus.$on("clearKeyWord", () => {
      this.keyword = "";
    });
  },
  methods: {
    // 转到搜索页面serach
    goSerach() {
      // this.$router.push({ path: "/serach" })

      // 【query参数】不用提前占位
      // this.$router.push("serach/?keyWord=" + this.keyWord)
      // this.$router.push(`serach/?keyWord=${this.keyWord}`)
      /*  this.$router.push({
                 // path: "/serach",
                 name: "serach",
                 query: { keyWord: this.keyWord }
             }) */

      // 【[params参数】
      // this.$router.push("/serach/ABCparams")
      // this.$router.push(`/serach/${"ABCparams"}`)
      // this.$router.push({
      //     name: "serach",
      //     params: {
      //         keyword: this.keyWord || undefined
      //     }
      // })

      // 【params和query参数】
      /* vue-router 实例上的 push 方法返回的是 promise 对象，
            所以传入的参数期望有一个成功和失败的回调，如果省略不写则会报错。 */
      /*  this.$router.push({
                 name: "serach",
                 params: {
                     paramsvalue: 'sdf'
                 },
                 query: {
                     keyWord: this.keyWord
                 }
             }) */

      console.log("goSearch");
      let locations = {
        name: "search",
        params: { keyword: this.keyword || undefined },
      };
      //确定路径当中有query参数
      // if (this.$route.query.categoryName) {
      //     locations.query = this.$route.query;
      // }
      this.$router.push(locations);
    },
    test() {
      alert(this.$store.state.user.userInfo.name);
    },
    // 推出登录
    async Logout() {
      try {
        await this.$store.dispatch("user/userLogout");
        this.$router.push("/home");
      } catch (error) {
        alert(error);
      }
    },
  },
  computed: {
    // 登录成功的用户名
    userName() {
      return this.$store.state.user.userInfo.name;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }

          a {
            cursor: pointer;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
