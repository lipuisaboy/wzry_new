<template>
  <div class="card">
    <div class="card-title d-flex py-3 mb-1">
      <span class="iconfont" :class="icon"></span>
      <span class="f-1 fs-xl ml-2 t-left">{{title}}</span>
      <a class="iconfont icon-more" href="/"></a>
    </div>
    <slot name="bottom"></slot>
    <div class="card-body d-flex jc-between py-2">
      <div v-for="(item,index) in categories" :key="index" 
           @click="itemClick(index)" :class="{active: index === currentIndex}"> 
        <div class="py-1">{{item.name}}</div>
      </div>
    </div>
    <div class="content">
      <swiper ref="list" :options="{autoHeight:true}" @slide-change="() => currentIndex = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category,index) in categories" :key="index">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    icon:{
      type:String
    },
    title:{
      type:String,
      required:true
    },
    categories:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.$refs.list.swiper.slideTo(index)
    }
  }
}
</script>

<style lang="scss">
.card{
  margin: 0 auto;
  border-bottom: 1px solid #eaeaea;
  .card-title{
    width: 26.2462rem;
    height: 3.8462rem;
    line-height: 1.8462rem;
    text-align: center;
    border-bottom: 0.0769rem solid #d4d9de;
  }
  .card-body{
    .active{
      color: #db9e3f;
      border-bottom: 3px solid #db9e3f;
    }
  }
  .content{
    margin-top:0.7692rem;
    a{
      display: block;
      margin-bottom: 1.1538rem;
      font-size: 1.0769rem;
    }
  }
}
</style>