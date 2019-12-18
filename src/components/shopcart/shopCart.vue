<template>
    <footer class="shopCarts">
        <div class="shopCarts-content">
            <div class="wai_cir">
                <div class="nei_cir" :class="{highlight:totalCount>0}">
                    <i class="icon-shopping_cart"></i>
                </div>
            </div>
            <span class="zongjia">
                ￥{{totalPrice}}
            </span>
            <div class="num" v-if="totalCount>0">{{totalCount}}</div>
            <div class="footer_line"></div>
            <span class="peisong">另需配送费￥{{deliveryPrice}}元</span>
            <div class="qisong" :class="payClass">{{pay}}</div>
        </div>

        <div class="balls-wrapper">
            <div v-for="(ball,index) in balls">
                <transition name="drop"
                        @before-enter="beforeDrop"
                        @enter="dropping"
                        @after-enter="afterDrop">
                    <div class="ball"  v-show="ball.show">
                        <div class="ball-inner">
                            <img :src="ball.img" />
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="cart-detail">
            <div class="cart-detail-head">
                <h1 class="title">购物车</h1>
                <div class="empty">清空</div>
            </div>
            <div class="cart-detail-content">
                <ul>
                    <li class="cart-detail-item border-1px" v-for="food in selectFoods">
                        <div class="cart-detail-food">
                            <div class="names">{{food.name}}</div>
                            <div class="price">
                                <span>￥</span>
                                <span>{{food.price}}</span>    
                            </div>
                        </div>
                        <div class="cart-control-wrapper">
                            <CartControl :food="food" @addFood="addFood" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>
<script>
import CartControl from '@/components/cartcontrol/cartControl.vue'
export default {
    data(){
        return {
            balls:[
                {show:false},
                {show:false},
                {show:false},
                {show:false},
                {show:false}
            ],
            dropBalls:[]    //下落的小球
        }
    },
    components:{
        CartControl
    },
    props:{
        selectFoods:{
            type:Array,
            default(){
                return [
                    
                ]
            }
        },
        deliveryPrice:{
            type:Number,
            required:true
        },
        minPrice:{
            type:Number,
            required:true
        }
    },
    async created(){
       
    },
    computed:{
        totalPrice(){
            let sumPrice = 0;
            this.selectFoods.forEach(item=>{
                item.count && (sumPrice+=item.price*item.count)
            })
            return sumPrice
        },
        totalCount(){
            let sumCount=0;
            this.selectFoods.forEach(item=>{
                item.count && (sumCount+=item.count)
            })
            return sumCount
        },
        pay(){
            if(this.totalPrice===0){
                return `￥${this.minPrice}起送`
            }else if(this.totalPrice<this.minPrice){
                let priceNum = this.minPrice - this.totalPrice;
                return `差￥${priceNum}起送`
            }else{
                return `去结算`
            }
        },
        payClass(){
            if(this.totalPrice<this.minPrice){
                return 'not-high'
            }else{
                return 'high'
            }
        }
        
    },
    methods:{
        drop(el,food){
           for(let i=0;i<this.balls.length;i++){
               let ball = this.balls[i];
               if(!ball.show){
                   ball.show = true;
                   ball.el = el;
                   ball.img = food.image
                   this.dropBalls.push(ball)
                   return;
               }
           }
        },
        beforeDrop(el){    //初始化小球
            console.log(el)
            let count = this.balls.length;
            while(count--){
                let ball = this.balls[count]
                if(ball.show){
                    // console.log(ball)
                    let rect = ball.el.getBoundingClientRect();
                    // console.log(rect)
                    let x = rect.left-40;
                    let y = -(window.innerHeight-rect.top-22);
                    // console.log(x,y)
                    el.style.display = "block";
                    el.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    el.style.transform = `translate3d(${x}px,0,0)`;
                    let inner = el.querySelector('.ball-inner')
                    inner.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    inner.style.transform = `translate3d(0,${y}px,0)`;

                }
            }
        },
        dropping(el,done){
            el.offsetTop;
            this.$nextTick(()=>{
                el.style.webkitTransform = `translate3d(0,0,0)`;
                el.style.transform = `translate3d(0,0,0)`;
                let inner = el.querySelector('.ball-inner')
                inner.style.webkitTransform = `translate3d(0,0,0)`;
                inner.style.transform = `translate3d(0,0,0)`;
                el.addEventListener('transitionend',done)
            })
            
        },
        afterDrop(el){
            let ball = this.dropBalls.shift();
            console.log(this.balls,this.dropBalls)
            if(ball.show){
                el.style.display = 'none';
                ball.show = false
            }
        },
        addFood(el,food){
            this.drop(el,food)
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import '@/common/mixin.scss';
footer{
    width:100%;
    height:0.48rem;
    position:fixed;
    bottom:0;
    left:0;
    z-index:50;
    .shopCarts-content{
        background:#141d27;
        height:0.48rem;
        display:flex;
        align-items:center;
        font-size:0.12rem;
      .wai_cir{
        width:0.56rem;
        height:0.58rem;
        background:#131d26;
        border-radius:50%;
        position:absolute;
        bottom:0;
        left:0.12rem;
        box-sizing:border-box;
        padding:0.06rem 0.06rem 0.08rem 0.06rem;
        .nei_cir{
            width:0.44rem;
            height:0.44rem;
            background:#2b343c;
            border-radius:50%;
            display:flex;
            flex-direction:column;
            align-items:center;
            &.highlight{
                background:#00a0dc;
                .icon-shopping_cart{
                    color:white;
                }
            }
            .icon-shopping_cart{
                color:#80858a;
                font-size:0.2rem !important;
                line-height:0.44rem;
                position:absolute;

            }
        }
    }
    .zongjia{
        font-size:0.16rem;
        color:rgba(255,255,255,0.4);
        margin-left:0.8rem;  
        z-index:50;
    }
     .num{
            position:absolute;
            z-index:1;
            width:0.24rem;
            height:0.16rem;
            background:red;
            top:-0.08rem;
            left:0.44rem;
            border-radius:0.1rem;
            box-shadow:0px 4px 8px 0px rgba(0,0,0,0.4);
            color:white;
            text-align:center;
            line-height:0.16rem;
            font-size:0.09rem;
            font-weight:700;
        }
    .footer_line{
        width:1px;
        height:0.25rem;
        background:rgba(255,255,255,0.4);
        margin:0 0.12rem;
    }
    .peisong{
        color:rgba(255,255,255,0.4);
    }
    .qisong{
        width:1.05rem;
        height:0.48rem;
        background:rgba(255,255,255,0.4);
        text-align:center;
        line-height:0.48rem;
        color:#979a9c;
        font-size:0.12rem;
        font-weight:700;
        position:absolute;
        right:0;
        bottom:0;
        &.high{
            background:#00a0dc;
            color:white;
        }
    }
    }
    .balls-wrapper{
        .ball{
            position:absolute;
            left:0.32rem;
            bottom:0.22rem;
            transition:all .4s linear;
            .ball-inner{
                width:0.16rem;
                height:0.16rem;
                // background:rgb(0,160,220);
                border-radius:50%;
                transition:all .4s linear;
                img{
                    width:100%;
                    height:100%;
                }

            }
        }
    }
    .cart-detail{
        position:absolute;
        left:0;
        // bottom:0.48rem;
        bottom:0;
        // top:-1rem;
        width:100%;
        z-index:-1;
        .cart-detail-head{
            display:flex;
            padding:0 0.18rem;
            height:0.4rem;
            background:#f3f5f7;
            border-bottom:1px solid rgba(243, 248, 253, 0.1);
            justify-content:space-between;
            align-items:center;
            .title{
                font-weight:200;
                font-size:0.14rem;
                line-height:0.4rem;
                color:rgb(7,17,27);
            }
            .empty{
                font-size:0.12rem;
                color:rgb(0,160,220);
                line-height:0.4rem;
            }

        }
        .cart-detail-content{
            max-height:2.17rem;
            padding:0 0.18rem;
            background:#fff;
            overflow:hidden;
            
            .cart-detail-item{
                height:0.48rem;
                line-height:0.48rem;
                box-sizing:border-box;
                padding:0.12rem 0;
                position:relative;
                @include border-1px(rgba(7,17,27,0.1));
                .cart-detail-food{
                    position:relative;
                    display:flex;
                    // align-items:;
                    .names{
                        font-size:0.14rem;
                        color:rgb(7,17,27);
                        line-height:0.24rem;
                    }
                    .price{
                        position:absolute;
                        right:0.7rem;
                        color:red;
                        line-height:0.24rem;
                        span:nth-child(1){
                            font-size:0.12rem;
                        }
                        span:nth-child(2){
                            font-size:0.14rem;
                        }
                    }
                }
                .cart-control-wrapper{
                    position:absolute;  
                    right:0;
                    top:0.12rem;
                    font-size:0.24rem;

                    
                }
            }
        }
    }

}




</style>