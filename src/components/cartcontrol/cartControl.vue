<template>
    <div class="cart-control">
        <transition name="move">
            <div class="decrease" v-if="food.count>0">
                <span class="icon-remove_circle_outline" @click="food.count>0 && food.count--"></span>
            </div>
        </transition>
        <div class="count" v-if="food.count>0">{{food.count}}</div>
        <div class="add icon-add_circle" @click="addCart"></div>
    </div>
</template>
<script>
export default {
    props:{
        food:{
            type:Object,
            required:true
        }
    },
    methods:{
        addCart(event){
            if(!this.food.count){
                this.$set(this.food,'count',1)
            }else{
                this.food.count++
            }
            this.$emit('addFood',event.target,this.food)
        }
    }
    
}
</script>
<style lang="scss" scoped>
.cart-control{
    display:flex;
    .decrease{
        display:flex;
        width:0.24rem;
        height:0.24rem;
        // display:inline-block;
        transform:translate3d(0,0,0);
        .icon-remove_circle_outline{
            display:inline-block;
            width:0.24rem;
            height:0.24rem;
            color:#00a0dc; 
            transform:rotate(0);
            transition: all 0.4s linear;
        }
        &.move-enter-active,&.move-leave-active{
            transition:all 0.4s linear;
        }
        &.move-enter,&.move-leave-to{
            transform:translate3d(0.24rem,0,0);
            opacity:0;
            .icon-remove_circle_outline{
                transform:rotate(180deg);
            }
        }
    }
    .count{
        display:inline-block;
        font-size:0.12rem;
        // vertical-align:middle;
        line-height:0.28rem;
        vertical-align: top;   
        margin:0 0.06rem;   
    }
    .add{
        display:inline-block;
        width:0.24rem;
        height:0.24rem;
        color:#00a0dc;
    }
}
</style>