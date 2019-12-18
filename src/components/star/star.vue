<template>
    <div class="star" :class="getSize">
        <span v-for="(classItem,index) in starClasses" class="star-item" :class="classItem" :key="index"></span>
    </div>  
</template>
<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
    props:{
        size:{
            type:Number,
            required:true
        },
        score:{
            type:Number,
            required:true
        }
    },
    computed:{
        getSize(){
            console.log(this.score)
            return 'star-'+this.size
        },
        starClasses(){
            let result = [];
            let score = Math.floor(this.score*2) / 2;
            let floorNum = score % 1 !==0;
            let intiger = parseInt(score);
            for(let i = 0;i<intiger;i++){
                result.push(CLS_ON)
            }
            if(floorNum){
                result.push(CLS_HALF)
            }
            while(LENGTH>result.length){
                result.push(CLS_OFF)
            }
            return result
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/common/mixin.scss';
.star{
    .star-item{
        display:inline-block;
    }
    &.star-48 > .star-item{
        margin-right:0.2rem;
        width:0.2rem;
        height:0.19rem;
        &.on{
            @include bg-image('./img/star48_on')
        }
        &.half{
            @include bg-image('./img/star48_half')
        }
        &.off{
            @include bg-image('./img/star48_off')
        }
    }
}
</style>