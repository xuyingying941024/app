<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- 头部信息 -->
    <app-header :poiInfoChild = "poiInfo"></app-header>
    <!-- 导航部分 -->
    <app-nav :commentNum="commentNum"></app-nav>
    <!-- 内容 -->
    <keep-alive><router-view/></keep-alive>
  </div>
</template>
<script>
import header from "./views/header/Header"
import nav from "./views/nav/Nav"
export default {
  name: "app",
  components:{
    "app-header": header,
    "app-nav": nav
  },
  data(){
    return{
      poiInfo:{},
      commentNum:0
    }
  },
  created(){
    fetch("/api/goods")
    // 转换数据
    .then(res => {
      return res.json()
    })
    .then(response => {
      // console.log(response)
      if(response.data.code == 0){
        this.poiInfo = response.data.data.poi_info
      }
    }),
    fetch("/api/ratings")
    // 转换数据
    .then(res => {
      return res.json()
    })
    .then(response => {
      // console.log(response)
      if(response.data.code == 0){
        this.commentNum = response.data.data.comment_num
      }
    })
  }
}
</script>
<style>
</style>