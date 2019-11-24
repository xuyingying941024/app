import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../views/goods/Goods'
import ratings from '../views/ratings/Ratings'
import seller from '../views/seller/Seller'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/goods',
    component: goods
  },
  {
    path: '/goods',
    name: '/goods',
    component: goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:"active"
})

export default router
