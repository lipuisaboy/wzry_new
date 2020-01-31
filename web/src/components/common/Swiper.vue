<template>
  <swiper :options="swiperOption" class="swiper" v-if="images.length">
    <swiper-slide v-for="(item,index) in images" :key="index">
      <a :href="item.url">
        <img :src="item.image" alt="">
      </a>
    </swiper-slide>
      <div class="swiper-pagination pagination-home px-3 pb-3" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  props:{
    images:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      swiperOption:{
          autoplay:{
            delay: 2000,
            stopOnLastSlide: false,
            /* 触摸滑动后是否继续轮播 */
            disableOnInteraction: false
          },
          speed:500,
          loop:true,
          pagination:{
            el:'.pagination-home',
            type:'bullets',
            clickable:true,
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active'
          }
        },
    }
  }
}
</script>

<style>
.swiper img{
  width: 100%;
  height: 12.6923rem;
}
.swiper-pagination{
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-radius:0.1538rem;
  }
  .swiper-pagination .my-bullet{
    border-radius: 0.1538rem;
    width: 0.6538rem;
    height: 0.6538rem;
    margin: 0.4615rem;
    background: white;
    display: block;
  }
  .swiper-pagination .my-bullet-active{
    border-radius: 0.1538rem;
    background: #4b67af;
    width: 0.6538rem;
    height:0.6538rem;
  }
</style>