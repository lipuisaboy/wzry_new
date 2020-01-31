<template>
  <div class="home">
    <swiper :images="imgs"></swiper>
    <navigation-bar/>
    <news-info/>
    <hero-info/>
  </div>
</template>

<script>
import Swiper from '../../components/common/Swiper'
import NavigationBar from '../../components/my/NavigationBar'
import NewsInfo from '../../components/my/info/NewsInfo'
import HeroInfo from '../../components/my/info/HeroInfo'

export default {
  components:{
    Swiper,
    NavigationBar,
    NewsInfo,
    HeroInfo
  },
  data(){
    return{
      imgs:[]
    }
  },
  created(){
    this.getImgs()
  },
  methods:{
    getImgs(){
      this.$http.get('/common/ads').then(res => {
        this.imgs = res.data[0].items
      })
    }
  }
}
</script>