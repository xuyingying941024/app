<template>
  <div class="header">
    <!-- {{poiInfoChild.name}} -->
    <!-- 顶部通栏开始 -->
    <div class="top-wrapper">
      <div class="back-wrapper fl tc">
        <span class="icon-arrow_lift"></span>
      </div>
      <form class="search-wrapper fl posr">
        <span class="search-icon posa"></span>
        <input type="text" class="search-bar w-b" placeholder="搜索店内商品">
      </form>
      <div class="more-wrapper fl tc">
        <a href="#" class="spelling-bt dib">拼单</a>
        <div class="more-bt dib">
          <i class="s-radius dib"></i>
          <i class="s-radius dib"></i>
          <i class="s-radius dib"></i>
        </div>
      </div>
      <!-- 顶部通栏结束 -->
      <!-- 顶部背景开始 -->
      <div class="bg-wrapper w-b posa" :style = "head_pic_url"></div>
      <!-- 顶部背景结束 -->
      <!-- 主题内容开始 -->
      <div class="content-wrapper">
        <div class="icon dib" :style = "pic_url"></div>
        <div class="name dib">
          <h3>{{poiInfoChild.name}}</h3>
        </div>
        <div class="collect">
          <img src="./img/star.png" alt="">
          <span>收藏</span>
        </div>
      </div>
      <!-- 主题内容结束 -->
      <!-- 公告内容开始 -->
      <div class="bulletin-wrapper">
        <img v-if = "poiInfoChild.discounts2" :src="poiInfoChild.discounts2[0].icon_url" alt="" class="icon">
        <span class="text" v-if = "poiInfoChild.discounts2">{{poiInfoChild.discounts2[0].info}}</span>
        <div class="detail" v-if = "poiInfoChild.discounts2" @click="showBulletin">
          {{poiInfoChild.discounts2.length}}个活动
          <span class="icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <!-- 公报bulletin -->
      <!-- 公告内容结束 -->
      <!-- 公告详情开始 -->
      <transition name="bulletin-detail">
      <div class="bulletin-detail" v-show = "isShow">
        <div class="detail-wrapper">
          <!-- 相关内容容器 -->
          <div class="main-wrapper" :style = "detail_bg">
            <!-- 图片 -->
            <div class="icon" :style = "pic_url"></div>
            <!-- 名称 -->
            <h3 class="name">{{poiInfoChild.name}}</h3>
            <!-- 星级评价 -->
            <div class="score">
              <app-star :scoreChild="poiInfoChild.wm_poi_score"></app-star>
              <span>{{poiInfoChild.wm_poi_score}}</span>
            </div>
            <!-- 配送时间 -->
            <p class="tip">{{poiInfoChild.shipping_fee_tip}} <i>|</i> {{poiInfoChild.min_price_tip}} <i>|</i> {{poiInfoChild.delivery_time_tip}}</p>
            <p class="time">
              配送时间：{{poiInfoChild.shipping_time}}
            </p>
            <div class="discounts" v-if="poiInfoChild.discounts2">
              <p>
                <img :src="poiInfoChild.discounts2[0].icon_url" alt="">
                <span>{{poiInfoChild.discounts2[0].info}}</span>
              </p>
            </div>
          </div>
          <!-- 关闭内容容器 -->
          <div class="close-wrapper">
            <span class="icon-close" @click = "closeBulletin"></span>
          </div>
        </div>
      </div>
    </transition>
      <!-- 公告详情结束 -->
    </div>
  </div>
</template>

<script>
  import star from "../star/Star";
export default {
  name: 'appheader',
  data(){
    return {
      isShow:false
    }
  },
  components:{
    "app-star":star
  },
  props: {
    poiInfoChild:{
      type:Object,
      default:{}
    }
  },
  computed:{
    head_pic_url(){
      return "background-image: url(" + this.poiInfoChild.head_pic_url + ");"
    },
    pic_url(){
      return "background-image: url(" + this.poiInfoChild.pic_url + ")"
    },
    detail_bg(){
      return "background-image: url(" + this.poiInfoChild.poi_back_pic_url + ")"
    }   
  },
  methods:{
    showBulletin(){
      this.isShow = true
    },
    closeBulletin(){
      this.isShow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url(../../common/css/icon.css);
  .header{
    height: 130px;
    padding-top: 20px;
  }
  /* 顶部通栏开始 */
  .top-wrapper,.search-wrapper,.search-wrapper input,.s-radius{
    height: 30px;
    line-height: 30px;
  }
  /* 左箭头 */
  .back-wrapper{
    width: 50px;
  }
  /* 搜索框 */
  .search-wrapper{
    width: calc(100% - 165px);
  }
  .search-wrapper .search-icon{
    width: 28px;
    height: 30px;
    background: url(./img/search.png) no-repeat left;
    background-position: 13px 10px;
    background-size: 15px 15px;
  }
  .search-wrapper .search-bar{
    border-radius:10px;
    -webkit-border-radius:30px;
    border: 1px solid #e4e4e4;
    padding:0 15px 0 40px;
    outline: none;
    box-sizing: border-box;
  }
  /* 拼单 */
  .more-wrapper{
    width: 115px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .more-wrapper a{
    text-decoration: none;
    border: 1px solid #ffffff;
    display: inline-block;
    padding: 0 5px;
    border-radius: 2px;
    -webkit-border-radius: 2px;
  }
  .more-bt{
    display: flex;
    align-items: center;
    height: 30px;
  }
  .s-radius{
    width: 4px;
    height: 4px;
    margin: 0 2px;
    border-radius: 50%;
    border: 1px solid #ffffff;
  }
  /* 顶部通栏结束 */
  /* 顶部背景开始 */
  .bg-wrapper{
    height: 150px;
    left: 0;
    top:0;
    z-index: -1;
    background-size: 100% 135%;
    background-position: center -12px;
  }
  /* 顶部背景结束 */
  /* 主题内容开始 */
  .content-wrapper{
    height: 50px;
    margin-top: 15px;
    float: left;
    width: 100%;
    padding: 0 10px;
  }
  .content-wrapper .icon{
    width: 50px;
    height: 50px;
    background-size: 121% auto;
    background-position: center;
    border-radius: 5px;
  }
  .content-wrapper .name{
    line-height: 50px;
    margin-left: 10px;
  }
  .content-wrapper .collect{
    display: inline-block;
    float: right;
    width: 32px;
  }
  .header .bulletin-detail .detail-wrapper .main-wrapper h3,.bulletin-wrapper span,.detail,.content-wrapper .name h3,.content-wrapper .collect span,.more-wrapper a{
    color: #ffffff;
  }
  .content-wrapper .collect img{
    float: left;
    width: 90%;
    margin-left: 5%;
  }
  /* 主题内容结束 */
  /* 公告内容开始 */
  .bulletin-wrapper{
    height: 33px;
    float: left;
    width: 100%;
    padding: 0 10px;
    line-height: 30px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .bulletin-wrapper img{
    height: 20px;
    border-radius: 2px;
    margin-right: 10px;
  }
  .bulletin-wrapper span{
    font-size: 13px;
  }
  .detail{
    position: absolute;
    right: 10px;
    font-size: 13px;
    cursor: pointer;
  }
  .icon-keyboard_arrow_right:before{
    font-size: 20px;
    margin-top: 5px;
    float: right;
  }
  /* 公告内容结束 */
  /* 公告详情 样式 */ 
.header .bulletin-detail {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: rgba(98, 98, 98, 0.8);
		z-index: 999;
	}
	
	.header .bulletin-detail .detail-wrapper {
		width: 100%;
		height: 100%;
		padding: 43px 20px 125px;
		box-sizing: border-box;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
		border-radius: 10px;
		text-align: center;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .icon {
		width: 60px;
		height: 60px;
		background-size: 135% 100%;
		background-position: center;
		border-radius: 5px;
		display: inline-block;
		margin-top: 40px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .name {
		font-size: 15px;
		color: white;
		margin-top: 13px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .score {
		height: 10px;
		margin-top: 6px;
		text-align: center;
		font-size: 0;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .score .star {
		display: inline-block;
		margin-right: 7px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .score span {
		display: inline-block;
		font-size: 10px;
		color: white;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .tip {
		font-size: 11px;
		color: #bababc;
		margin-top: 8px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .tip i {
		margin: 0 7px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .time {
		font-size: 11px;
		color: #bababc;
		margin-top: 13px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .discounts {
		margin-top: 20px;
		padding: 0 20px;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .discounts p {
		padding-top: 20px;
		border-top: 1px solid #BABABC;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .discounts img {
		width: 16px;
		height: 16px;
		vertical-align: middle;
	}
	
	.header .bulletin-detail .detail-wrapper .main-wrapper .discounts span {
		font-size: 11px;
		line-height: 16px;
		color: white;
  }
  
  .header .bulletin-detail .detail-wrapper .close-wrapper {
		padding-top: 20px;
		height: 40px;
    text-align: center;
    cursor: pointer;
	}
	
	.header .bulletin-detail .detail-wrapper .close-wrapper span {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  font-size: 14px;
  color: white;
  display: inline-block;
  background: rgba(118, 118, 118, 0.7);
  border: 1px solid rgba(140, 140, 140, 0.9);
}

/* 动画效果 */ 
.bulletin-detail-enter-active,
.bulletin-detail-leave-active {
  transition: 2s all;
}

.bulletin-detail-enter,
.bulletin-detail-leave-to {
  opacity: 0;
}

.bulletin-detail-enter-to,
.bulletin-detail-leave {
  opacity: 1;
}
</style>
