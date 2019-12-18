<template>
    <header>
        <div class="header_top">
            <img :src="seller.avatar" alt="">
            <div class="thename">
                <div>
                    <div class="brand brands"></div>
                    <span>{{seller.name}}</span>
                </div>
                <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
                <div v-if="seller.supports">
                    <div class="icon" :class="classTap[seller.supports[1].type]"></div>
                    <span>{{seller.supports[1].description}}</span>
                </div>
            </div>
            <div class="hongbao" @click="tranflag=true">
                5个 >
            </div>
        </div>
        <div class="header_bottom">
            <div class="bulletin"></div>
            <p>{{seller.bulletin}} </p>
            <p>></p>
        </div>
        <transition name="fade">
            <div class="detail" v-if="tranflag">
                <div class="detail-wraper clearfix">
                    <p class="detail-title">{{seller.name}}</p>
                    <div class="detail-star">
                        <star v-if="seller.score" :size="48" :score="seller.score" />
                    </div>
                    <headerTitle title="优惠信息" />
                    <ul class="detail-support">
                        <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                            <span class="icon" :class="classTap[item.type]"></span>
                            <span class="support-text">{{item.description}}</span>
                        </li>
                    </ul>
                    <headerTitle title="商家公告" />
                    <div class="detail-bulletin">
                        {{seller.bulletin}}
                    </div>
                </div>
                <div class="detail-close" @click="tranflag=false">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </header>
</template>
<script>
import star from '@/components/star/star.vue'
import headerTitle from '@/components/headertitle/headerTitle.vue'
export default {
    data(){
        return{
            tranflag:false
        }
    },
    props:{
        seller:{
            type:Object,
            required:true
        }
    },
     created(){
        this.classTap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        // console.log(this.tranflag)
        
    },
    components:{
        star,headerTitle
    }
    

}
</script>
<style lang="scss" scoped>
@import '@/common/mixin.scss';
html{
    height:100%;
    font-size:26.66667vw;
}
/* 头部 */
header{
    width:100%;
    height:1.34rem;
    background:url('./img/avatar.jpg') no-repeat;
    background-size:100% 200%;
    box-shadow:inset 0.1rem 0.1rem 1rem 1rem rgba(7,17,27,0.5) ;
    
}
.header_top{
    margin:0.24rem 0.12rem 0.18rem 0.24rem;
    display:flex;
    // justify-content:space-between;
}
.header_top>img{
    width:0.64rem;
    height:0.64rem;
    border-radius:4px;
}
.thename{
    margin:4px 0 0 0.16rem;
    display:flex;
    flex-direction:column;
    
}
.brand{
    width:0.3rem;
    height:0.18rem;
    margin-right:0.06rem;
    &.brands{
        @include bg-image('./img/brand');
    }
}
.thename>div:nth-of-type(1){
    display:flex;
    font-size:0.16rem;
}
.thename>div:nth-of-type(1)>span{
    color:white;
    font-weight:bold;
    line-height:0.18rem;
}
.thename>span{
    font-size:0.12rem;
    margin:0.05rem 0 0.07rem 0;
    color:white;
    
}
.thename>div:nth-of-type(2){
    display:flex;
}
.thename .icon{
    width:0.12rem;
    height:0.12rem;
    margin-right:0.04rem;
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
.thename>div:nth-of-type(2)>span{
    font-size:0.1rem;
    line-height:0.12rem;
    color:white;
}
.hongbao{
    position:absolute;
    right:0.12rem;
    top:0.67rem;
    box-sizing:border-box;
    width:0.42rem;
    height:0.24rem;
    background:rgba(0,0,0,0.3);
    font-size:0.1rem;
    border-radius:0.15rem;
    padding:0.04rem 0.05rem;
    color:white;
    line-height:0.17rem;
}
.header_bottom{
    width:100%;
    height:0.28rem;
    box-sizing:border-box;
    padding:0 0.12rem;
    background:rgba(7,17,27,0.3);
    display:flex;
    align-items:center;
    font-size:0.1rem;
    color:white;
    font-weight:200;
}
.header_bottom>.bulletin{
    width:0.22rem;
    height:0.12rem;
    margin-right:0.04rem;
    @include bg-image('./img/bulletin')
}
.header_bottom>p:nth-of-type(1){
    width:3.11rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}

.detail{
    &.fade-enter,&.fade-leave-to{
        opacity:0;
    }
    &.fade-enter-active,&.fade-leave-active{
        transition:1s;
    }
    &.fade-leave,&.fade-enter-to{
        opacity:1;
    }
    position:fixed;
    height:100%;
    width:100%;
    left:0;
    top:0;
    bottom:0;
    right:0;
    z-index:100;
    color:white;
    overflow:auto;
    background:rgba(7,17,27,0.8);
    .detail-wraper{
        min-height:100%;
        .detail-title{
            margin:0.64rem 0 0.16rem 0;
            font-size:0.16rem;
            text-align:center;
            font-weight:700;
        }
        .detail-star{
            margin-bottom:0.28rem;
            text-align:center;
        }
        .detail-support{
            font-size:0.12rem;
            font-weight:200;
            line-height:0.12rem;
            margin:0 0 0.28rem 0.48rem;
            .support-item{
                margin-bottom:0.12rem;
                display:flex;
                align-items:center;
                &:last-child{
                    margin-bottom:0rem !important;
                }
                .icon{
                    display:inline-block;
                    width:0.16rem;
                    height:0.16rem;
                }
                .decrease{
                    @include bg-image('./img/decrease_2')
                }
                .discount{
                    @include bg-image('./img/discount_2')
                }
                .guarantee{
                    @include bg-image('./img/guarantee_2')
                }
                .invoice{
                    @include bg-image('./img/invoice_2')
                }
                .special{
                    @include bg-image('./img/special_2')
                }
                .support-text{
                    line-height:0.16rem;
                    margin-left:0.06rem;
                }
            }
        }
        .detail-bulletin{
            font-size:0.12rem;
            font-weight:200;
            color:rgb(255,255,255);
            line-height:0.24rem;
            margin:0 0.48rem 0 0.48rem;
        }
    }
    .detail-close{
        position:relative;
        margin:-0.64rem auto 0 auto;
        width:0.32rem;
        height:0.32rem;
        clear:both;
    }
    
}
</style>
