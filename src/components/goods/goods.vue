<template>
    <div class="good">
        <div class="list_left" ref="goodLeft">
            <ul class="list_left_ul">
                <li v-for="(item,index) in goods" :key="index" 
                    :class="{caidan_active:comRightIdx===index}"
                    ref="ab"
                    @click="clkLeft(index,comRightIdx)"
                    >
                     <div class="list_left_item border-1px">
                        <span v-if="item.type>0" class="icon" :class="classTap[item.type]"></span>
                        <!-- <img v-if="item.type>0" src="./img/special_3@2x.png" alt=""> -->
                        {{item.name}}
                    </div>
                </li> 
            </ul>
        </div>
        <div class="list_right" ref="goodRight">
            <div>
                <div class="list_right_fen" v-for="(item,index) in goods" :key="index" ref="foodList">
                    <div class="hot_tao">
                        {{item.name}}
                    </div>
                    <div class="items" v-for="(foodItem,foodIndex) in item.foods" :key="foodIndex">
                        <div class="hots_item">
                            <img :src="foodItem.icon" alt="">
                            <div class="hots_item_cont">
                                <p>{{foodItem.name}}</p>
                                <p v-if="foodItem.description">{{foodItem.description}}</p>
                                <p>月售{{foodItem.sellCount}}份 好评率{{foodItem.rating}}%</p>
                                <div>
                                    <span><span>￥</span>{{foodItem.price}}</span>
                                    <span v-if="foodItem.oldPrice">{{foodItem.oldPrice}}</span>
                                </div>
                            </div>
                            <div class="right-cart-control">
                                <cartControl :food="foodItem" @addFood="addFoods" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <shopCart ref="shopCart" v-if="seller.deliveryPrice" 
                        :deliveryPrice="seller.deliveryPrice" 
                        :minPrice="seller.minPrice"
                        :selectFoods="sellFoods"
                         />
    </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import getData from '@/api/header.js'
import shopCart from '@/components/shopcart/shopCart.vue'
import cartControl from '@/components/cartcontrol/cartControl.vue'
export default {
    props:{
        seller:{
            type:Object,
            required:true
        }
    },
    data(){
        return{
            goods:[],
            leftHeight:0,
            rightHeight:0,
            listHeight:[]
        }
    },
   async created(){
      this.goods = await getData('/api/goods')
      this.classTap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      await this.$nextTick();
      await this.initScroll();
      this.computedHeight();
    //   console.log(this.goods)
      console.log(this.sellFoods)
    
    },
    methods:{
        initScroll(){
            this.leftScroll = new BScroll(this.$refs.goodLeft,{
                click:true
            });
            this.rightScroll = new BScroll(this.$refs.goodRight,{
                probeType:3,
                click:true
            })
            this.rightScroll.on('scroll',(pos)=>{
                this.rightHeight = Math.abs(pos.y)
                if(this.rightHeight>=this.listHeight[this.listHeight.length-2]){
                    this.leftScroll.scrollTo(0,-54)
                }
                if(this.rightHeight<=10){
                    this.leftScroll.scrollTo(0,0)
                }
            })
        },
        computedHeight(){
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height)
            foodList.forEach((item,index)=>{
                height+=item.clientHeight;
                this.listHeight.push(height)
            })
        },
        clkLeft(idx,b){
            let foodsList = this.$refs.foodList;
            let foodlist = foodsList[idx];
            this.rightScroll.scrollToElement(foodlist,500)
            console.log(this.$refs.shopCart.drop)
            
            
        },
        addFoods(el,food){
            this.$refs.shopCart.drop(el,food)
        }
    },
    computed:{
        comRightIdx(){
            for(var i=0;i<this.listHeight.length;i++){
                var height1 = this.listHeight[i];
                var height2 = this.listHeight[i+1];
                if(!height2 || this.rightHeight>=height1 && this.rightHeight<height2){
                    return i
                }
            }   
        },
        sellFoods(){
            let foods = [];
            this.goods.forEach(good=>{
                good.foods.forEach(food=>{
                    foods.push(food)
                })
            })
            return foods
        }
    },
    components:{
        shopCart,cartControl
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/mixin.scss';
.good{
    display:flex;
    position:absolute;
    left:0;
    top:1.74rem;
    bottom:0.48rem;
    width:100%;
    overflow:hidden;
}
.list_left{
    width:0.8rem;
    height:100%;
    display:flex;
    flex-direction:column;
    
}
.list_left_ul{
    width:0.8rem;


}
.list_left_ul>li{
    width:100%;
    height:54px;
    background:#f3f5f7;
    font-size:0.12rem;
    box-sizing:border-box;
    padding:0 0.12rem;
    line-height:0.14rem;
}
.list_left_ul>.caidan_active{
    background:white;
    &>.xian2::after{
        width:0px !important;
    }
}
.list_left_ul>li>.list_left_item{
    width:0.56rem;
    height:0.54rem;
    display:table-cell;
    vertical-align:middle;
    @include border-1px(rgba(7,17,27,0.1));
    .icon{
    display:inline-block;
    width:0.12rem;
    height:0.12rem;
        &.decrease{
            @include bg-image('./img/decrease_1')
        }
        &.discount{
            @include bg-image('./img/discount_1')
        }
        &.guarantee{
            @include bg-image('./img/guarantee_1')
        }
        &.invoice{
            @include bg-image('./img/invoice_1')
        }
        &.special{
            @include bg-image('./img/special_1')
        }
    }
}
.list_left_ul>li img{
    width:0.12rem;
    height:0.12rem;
}
.caidan_active{
    background:white;   
    &>.list_left_item::after{
        width:0 !important;
    }
}
// 右边
.list_right{
    flex:1;
}
.hot_tao{
    height:0.26rem;
    background:#f3f5f7;
    border-left:0.02rem solid rgba(7,17,27,0.1);
    font-size:0.12rem;
    box-sizing:border-box;
    font-weight:500;
    padding-left:0.12rem;
    color:#93999f;
    line-height:0.26rem;
    
}
.items{
    box-sizing:border-box;
    position:relative;
    padding:0.18rem;
    @include border-1px(rgba(7,17,27,0.1));
    &::after{
        width:2.59rem;
        left:0.18rem;
    };
    &.items:last-child{
        &::after{
            width:0;
        }
    }
    .right-cart-control{
        position:absolute;
        right:0.3rem;
        bottom:0.1rem;
    }
}
.hots_item{
    display:flex;
}
.hots_item>img{
    width:0.57rem;
    height:0.57rem;
    margin-right:0.1rem;
}
.hots_item_cont{
    display:flex;
    flex-direction:column;
}
.hots_item_cont>p:nth-of-type(1){
    font-size:0.14rem;
}
.hots_item_cont>p:nth-of-type(2),.hots_item_cont>p:nth-of-type(3){
    margin-top:0.07rem;
    font-size:0.12rem;
    color:rgb(147,153,159);
}
.hots_item_cont>div{
    line-height:0.14rem;
    margin-top:0.07rem;
    display:flex;
    span:nth-of-type(1){
        font-size:0.14rem;
        color:red;
        // margin-top:0.08rem;
        margin-right:0.05rem;
        font-weight:700;
        span{
            font-size:0.1rem;
            font-weight:normal;
        }
    }
    span:nth-of-type(2){
        font-size:0.1rem;
        color:rgb(147,153,159);
        font-weight:700;
    }
}
/* 内容里的分割线 */
.item_line{
    position:absolute;
    height:1px;
    width:2.59rem;
    background:rgba(7,17,27,0.1);
    bottom:0;
    left:0.18rem;
}
</style>