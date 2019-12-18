<template>
    <div class="title">
        <div class="line"></div>
        <div class="text">{{title}}</div>
        <div class="line"></div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            required:true
        }
    }
}
</script>
<style lang="scss" scoped>
    .title{
        font-size:0.14rem;
        display:flex;
        margin-left:0.36rem;
        margin-bottom:0.24rem;
        .text{
            font-weight:700;
            line-height:0.14rem;
            margin:0 0.12rem;
        }
        .line{
            width:1.12rem;
            margin-top:0.06rem;
            height:1px;
            background:rgba(255,255,255,0.2);
        }

    }
    
</style>