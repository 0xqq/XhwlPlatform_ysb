<template>
  <div id="app">
  <!-- //淡入淡出 -->
<!--     <transition name="router-fade" mode="out-in"> 
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition> -->
    <transition name="router-fade" mode="out-in">
          <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import 'babel-polyfill' //兼容IE
// import $ from 'jquery'
export default {
  name: 'app'
}
</script>
<style lang="scss">
  @import './style/common';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 0;
  }
  //淡入淡出
  .router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .1s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
</style>