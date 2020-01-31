<template>
  <div class="news bg-white my-3 px-4">
    <card title="新闻资讯" icon="icon-mulu" :categories="list">
      <template #items="{category}">
        <router-link :to="`/article/${item._id}`" tag="div" class="item d-flex" 
                      v-for="(item,index) in category.newsList" :key="index">
          <span>[{{item.categoryName}}]</span>
          <span class="px-1">|</span>
          <span class="f-1 t-ellipse">{{item.title}}</span>
          <span>{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '../../common/card/Card'
import dayjs from 'dayjs'

export default {
  components:{
    Card
  },
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch(){
      this.$http.get('/news/list').then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss">
  .item{
    margin-bottom: 1.1538rem;
    font-size: 1.0769rem;
  }
</style>