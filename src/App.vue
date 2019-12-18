<template>
  <div id="app">
      <Header :seller="seller" />
      <div class="tab border-1px">
          <router-link to="/good">商品</router-link>
          <router-link to="/seller">卖家</router-link>
          <router-link to="/rating">评价</router-link>
      </div>
      <router-view :seller="seller"></router-view>
      
  </div>
</template>
<script>
import Header from '@/components/header/header.vue'
import getData from '@/api/header.js'
export default {
    data(){
      return {
        seller:{},
        goods:{}
      }
    },
    components:{
      Header
    },
    async created(){
      this.seller = await getData('/api/seller')
      console.log(this.seller)
    }
}
</script>
<style lang="scss">
@import "@/common/mixin.scss";
  .tab{
    display:flex;
    height:0.4rem;
    line-height:0.4rem;
    @include border-1px(#e5e5e5);
      a{
        display:block;
        flex:1;
        text-align:center;
        font-size:0.14rem;
        color:rgb(77,85,93);
      }
      & > a.active{
        color:red;
      }


  }
</style>
