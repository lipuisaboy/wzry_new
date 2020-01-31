<template>
  <div class="tab-bar">
    <div class="tab-title bg-title d-flex ai-center py-2 pl-3">
        <img src="../../assets/img/logo.png" alt="">
        <div class="title-font ml-3 f-1">
          <div class="t-white">王者荣耀</div>
          <div class="t-title-font fs-s">团队成就更多</div>
        </div>
         <a href="https://pvp.qq.com/zlkdatasys/mct/d/play.shtml"
           class="t-font t-center bg-orange fs-m mr-3 mt-1">
          立即下载
        </a>
    </div>
    <div class="tab-body bg-orange t-white fs-base d-flex jc-around t-center">
        <a class="nav-item" v-for="(item,index) in title" 
            :key="index"
            href="/"
            :class="{active: index === currentIndex}"
            @click="itemClick(index)">
            <span>
               {{item}}
            </span>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
    }
  }
}
</script>

<style lang="scss">
.tab-bar{
  .tab-title{
    height: 3.4615rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    img{
      height: 2.3077rem
    }
    a{
      display: block;
      width: 4.6154rem;
      height: 1.8462rem;
      line-height: 1.8462rem;
      border-radius: 0.1538rem;
    }
  }
  .tab-body{
    margin-top: 3.4615rem;
    height: 3.2308rem;
    line-height: 3.2308rem;
    .nav-item{
        display: inline-block;
        width: 9.6154rem;
        color:white;
      &.active{
        span{
          padding-bottom: 0.2308rem;
          border-bottom: 0.2308rem solid #fff
        }
      }
    }
  }
}
</style>