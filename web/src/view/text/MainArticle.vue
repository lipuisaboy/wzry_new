<template>
  <div class="text">
    <div class="title d-flex" v-if="news">
      <i class="iconfont icon-fanhui t-blue ml-1 mr-2"></i>
      <span class="f-1 t-blue-t f-w t-ellipse">{{news.title}}</span>
      <span class="t-grey fs-s mr-2">{{news.updatedAt | date}}</span>
    </div>
    <div v-html="news.body" class="fs-xl px-4 mb-5 body"></div>
    <div class="foot px-4">
      <div class="head d-flex">
        <i class="iconfont icon-xiangguan icon"></i>
        <span class="ml-2 t-blue-t fs-xl f-w">相关资讯</span>
      </div>
      <router-link class="d-flex my-2 fs-l t-dark" :to="`/article/${item._id}`" tag="div" 
                  v-for="(item,index) in news.relevant" :key="index">
        <span class="t-ellipse f-1">{{item.title}}</span>
        <span class="t-grey">{{item.updatedAt | date}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props:{
    id:{
      type:String,
      required:true
    },
  },
   filters:{
    date(val){
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  watch:{
    id:'fetch'
  },
  data(){
    return{
      news:{}
    }
  },
  created(){
    this.id && this.fetch()
  },
  methods:{
    fetch(){
      this.$http.get(`/article/detail/${this.id}`).then(res => {
        this.news = res.data
      })
    }
  }
}
</script>

<style lang="scss">
  .text{
    .title{
      line-height: 2.9231rem;
      height: 2.9231rem;
      border-bottom: 1px solid #d4d9de;
    }
    .body{
      
      p{
        line-height: 2rem;
      }
      img{
        width: 100%;
        height: auto;
      }
      iframe{
        height: auto;
        width: 100%;
      }
    }
    .foot{
      .head{
        height: 2.8462rem;
        line-height: 2.8462rem;
        .icon{
          font-size: 1.9231rem;
        }
      }
    }
  }
</style>