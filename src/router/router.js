import Vue from 'vue'
import vueRouter from 'vue-router'
import Goods from '@/components/goods/goods.vue'
import Ratings from '@/components/ratings/ratings.vue'
import Seller from'@/components/seller/seller.vue'

Vue.use(vueRouter);
export default  new vueRouter({
    mode:'history',
    routes:[
        {path:'/',redirect:'/good'},
        {path:'/good',component:Goods},
        {path:'/rating/',component:Ratings},
        {path:'/seller',component:Seller}
    ],
    linkActiveClass:'active',
    linkExactActiveClass:'active'


})