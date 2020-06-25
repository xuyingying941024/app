<template>
  <div class="goods">   
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">  
      <ul>
        <!-- 专场 -->
        <li class="menu-item" :class="{'current':currentIndex === 0}" @click="selectMenu(0)">
          <p class="text">
            <img class="icon" :src="container.tag_icon" v-if="container.tag_icon">
            {{container.tag_name}}      
          </p>
        </li>
        <!-- 热销 -->
        <li class="menu-item" :class="{'current':currentIndex === index+1}" @click="selectMenu(index+1)" v-for="(item,index) in goods" :key="index">
          <p class="text">  
            <img :src="item.icon" alt="" class="icon">
            {{item.name}}
          </p>
          <i class="num" v-show = "calculateCount(item.spus)">{{calculateCount(item.spus)}}</i>
        </li>
      </ul>
    </div>
    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">   
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook"> 
          <div v-for="(item,index) in container.operation_source_list" :key=index>
            <img :src="item.pic_url"> 
          </div>
        </li>
        <!-- 具体分类 -->
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具体的商品列表 -->
          <ul>
            <li class="food-item" v-for="(food,index) in item.spus" @click="showDetail(food)" :key=index>
              <!-- 食品图片用背景显示 -->
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <!-- 食品名称 -->
                <h3 class="name">{{food.name}}</h3>
                <!-- 网友推荐 -->
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <!-- 月售和赞 -->
                <div class="extra">
                  <span class="saled">{{food.month_saled_content}}</span>
                  <span class="praise">{{food.praise_content}}</span>
                </div>
                <!-- 产品标签的照片 -->
                <img class="product" :src="food.product_label_picture">
                <p class="price">
                  <span class="text">${{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>    
              <!-- 增减商品 -->
              <div class="cartcontrol">     
                  <app-cartcontrol :food="food"></app-cartcontrol>
              </div>     
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <app-shop :poiInfo = "poiInfo" :selectFoods = "selectFoods"></app-shop>
    <!-- 商品详情 -->
    <app-product-detail :food="selectFood" ref="foodView"></app-product-detail>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  import shopCart from "../shopcart/Shopcart"
  import cartcontrol from "../cartcontrol/Cartcontrol"
  import productdetail from "../productdetail/productDetail"
  export default {
    name: 'goods',
    // props:{
    //   goodsChild:String,
    //   default:{}
    // },
    components:{
      "app-shop":shopCart,
      "app-cartcontrol":cartcontrol,
      "app-product-detail":productdetail
    },
    data() {
      return {
        container: {},
        goods: [],
        // 存放购物车的数据
        poiInfo:{},
        // 将foodlist中拿到的数据放到该数组中
        listHeight: [],
        // 保存实例化对象
        menuScroll: {},
        foodScroll: {},
        // 默认高度值
        scrollY: 0,
        //商品详情
        selectFood:{}
      }
    },
    // 因为计算属性不能够传值，所以使用方法methods
    methods: {
      head_bg(imgName) {
        return "background-image:url(" + imgName + ");"
      },
      initScroll() {
        // 保存实例化对象
        this.menuScroll = new BScroll(this.$refs.menuScroll,{
          click:true
        })
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          // scroll触发时机
          // probeType默认值为0，为0的状态下不会触发滚动（scroll）事件，除非为（1，2，3）
          probeType: 3,
          // 添加点击事件
          click:true
        })

        // foodScroll监听事件
        this.foodScroll.on("scroll", (pos) => {
          // scroll参数：{object}{x,y}滚动的实时坐标
          // console.log(pos.y)
          // 取整取绝对值
          this.scrollY = Math.abs(Math.round(pos.y))
          // console.log(this.scrollY)
        })  
      },
      calculateHeight() {
        let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
        // console.log(foodlist)
        //累加可视高度
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        // console.log(this.listHeight)
      },
      selectMenu(index){
        console.log(index)
        let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
        let element = foodlist[index]
        // // 滚动到对应元素的位置
        this.foodScroll.scrollToElement(element,250)
      },
      //为热销添加已选商品的数量
      calculateCount(spus){
        let num = 0
        //遍历spus
        spus.forEach((food) => {
          // 如果spus大于0
          if(food.count > 0){
            num += food.count
          }
        })
        return num
      },
      // 商品详情
      showDetail(food){
        this.selectFood = food
        this.$refs.foodView.showView()
      }
    },
    created() {
      fetch("/api/goods")
        .then(res => {
          return res.json()
        })
        .then(response => {
          // console.log(response)
          if (response.data.code == 0) {
            this.container = response.data.data.container_operation_source
            this.goods = response.data.data.food_spu_tags
            this.poiInfo = response.data.data.poi_info
            // console.log(this.poiInfo)
            // DOM已经更新 执行以下方法
            this.$nextTick(() => {
              // 执行滚动方法
              this.initScroll()

              // 计算分类的区间高度
              this.calculateHeight()
              // 监听滚动的位置
              // 根据滚动位置确认下标，与左侧对应
              // 通过下标实现点击左侧，滚动到右侧
            })
          }
        })
    },
    computed:{
      currentIndex(){
        for(let i = 0; i < this.listHeight.length; i++){
          // 获取商品区间的范围
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]

          // 是否在上述区间中
          if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
            // console.log(i)
            return i
          }

        }
        return 0
      },
      //拿到数据再利用属性传值将数据传递到子组件shopcart中
      selectFoods(){
        //定义空数组 用来存放最终获取到的数据
        let foods = []
        //用forEach遍历goods.json中的food_spu_tags数据 此前已经将这个数据存在了goods数组中
        this.goods.forEach((myfoods) => {
          //用forEach遍历food_spu_tags数据中的spus数组
          myfoods.spus.forEach((food) => {
            //判断如果count大于0
            if(food.count > 0){ 
              //将food数据push到foods数组中
              foods.push(food)
            }
          })
        })
        //返回foods
        return foods
      }
    }
  }
</script>
<style scoped>
  .goods {
    width: 100%;
    position: absolute;
    top: 190px;
    bottom: 51px;
    left: 0;
    display: flex;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    flex: 0 0 85px;
    /* background-color: red; */
  }

  .goods .foods-wrapper {
    flex: 1;
    /* background-color: blue; */
  }

  .goods .menu-wrapper .menu-item {
    padding: 16px 23px 15px 10px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
    background-color: #e4e4e4;
  }

  .goods .menu-wrapper .menu-item .text {
    font-size: 13px;
    columns: #333333;
    line-height: 17px;
    vertical-align: middle;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .goods .menu-wrapper .menu-item .text .icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }

  /* 专场样式 */
  .goods .foods-wrapper .container-list {
    padding: 11px 11px 0 11px;
    border-bottom: 1px solid #e4e4e4;
  }

  .goods .foods-wrapper .container-list img {
    width: 100%;
    margin-bottom: 11px;
    border-radius: 5px;
  }

  /* 具体分类商品布局 */
  .goods .foods-wrapper .food-list {
    padding: 11px;
  }

  .goods .foods-wrapper .food-list .title {
    height: 13px;
    font-size: 13px;
    background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
    background-size: 2px 10px;
    padding-left: 7px;
    margin-bottom: 12px;
  }




  .goods .foods-wrapper .food-list .food-item {
    display: flex;
    margin-bottom: 25px;
    position: relative;
  }

  .goods .foods-wrapper .food-list .food-item .icon {
    flex: 0 0 63px;
    background-position: center;
    background-size: 120% 100%;
    background-repeat: no-repeat;
    margin-right: 11px;
    height: 75px;
  }

  .goods .foods-wrapper .food-list .food-item .content {
    flex: 1;
  }

  /* 具体内容样式 */
  .goods .foods-wrapper .food-list .food-item .content .name {
    font-size: 16px;
    line-height: 21px;
    color: #333333;
    margin-bottom: 10px;
    padding-right: 27px;
  }

  .goods .foods-wrapper .food-list .food-item .content .desc {
    font-size: 10px;
    line-height: 19px;
    color: #bfbfbf;
    margin-bottom: 8px;

    /* 超出部分显示省略号*/
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .goods .foods-wrapper .food-list .food-item .content .extra {
    font-size: 10px;
    color: #BFBFBF;
    margin-bottom: 7px;
  }

  .goods .foods-wrapper .food-list .food-item .content .extra .saled {
    margin-right: 14px;
  }

  .goods .foods-wrapper .food-list .food-item .content .product {
    height: 15px;
    margin-bottom: 6px;
  }

  .goods .foods-wrapper .food-list .food-item .content .price {
    font-size: 0;
  }

  .goods .foods-wrapper .food-list .food-item .content .price .text {
    font-size: 14px;
    color: #fb4e44;
  }

  .goods .foods-wrapper .food-list .food-item .content .price .unit {
    font-size: 12px;
    color: #BFBFBF;
  }

  /* 当前选中 */
  .goods .menu-wrapper .menu-item.current {
    background: white;
    font-weight: bold;
    margin-top: -1px;
  }

  .goods .menu-wrapper .menu-item:first-child.current {
    margin-top: 1px;
  }

  .goods .foods-wrapper .food-list .food-item .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .goods .menu-wrapper .menu-item .num {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    color: white;
    background: red;
    text-align: center;
    font-size: 7px;
    line-height: 13px;
  }
 
</style>