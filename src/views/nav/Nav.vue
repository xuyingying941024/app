<template>
  <div class="nav">
    <router-link to="/goods" class="nav-item">
      点菜
      <i class="line"></i>
    </router-link>
    <router-link to="/ratings" class="nav-item">
      评价（{{commentNum}}）
      <i class="line"></i>
    </router-link>
    <router-link to="/seller" class="nav-item">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "appnav",
  props:{
    commentNum:{
      type:Number,
      default:0
    }
  }
  // components:{
  //   goods,
  //   ratings,
  //   seller
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}
.nav-item {
  flex: 1;
  color: #666666;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  position: relative;
}
/* 选中的样式 */
.active {
  color: #ffbb22;
}
/* 横线样式 */
.active .line{
  width: 20px;
  height: 2px;
  background-color: #ffbb22;
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -10px;
}
</style>
