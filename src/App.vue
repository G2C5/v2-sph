<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Home from "./views/home"
export default {
  name: 'App',
  components: {
    Home
  },
  mounted() {
    this.$store.dispatch("home/getCategoryList");

  },
}
</script>

<style></style>
