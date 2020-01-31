<template>
  <div class="heroes bg-white my-3 px-4">
    <card title="英雄列表" icon="icon-card-hero" :categories="heroList">
      <div slot="bottom" class="slot"><img src="../../../assets/img/my.jpg" alt=""></div>
      <template #items="{category}" class="d-flex">
        <div class="list d-flex">
          <router-link :to="`/hero/${item._id}`" class="list-item" v-for="(item,index) in category.heroList" :key="index">
            <img :src="item.avatar" alt="">
            <p>{{item.name}}</p>
          </router-link>
        </div>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '../../common/card/Card'
export default {
  components:{
    Card
  },
  data(){
    return{
      heroList:[]
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch(){
      this.$http.get('/heroes/all').then(res => {
        this.heroList = res.data
      })
    }
  }
}
</script>

<style lang="scss">
  .heroes{
    .slot{
      img{
        width: 100%;
      }
    }
    .list{
      flex-wrap: wrap;
      text-align: center;
      .list-item{
        width: 20%;
        img{
          width: 4.3723rem;
          height: 4.3723rem;
        }
        p{
          margin: 0.3846rem 0 0.3846rem 0;
          font-size: 0.9231rem;
        }
      }
    }
  }
</style>