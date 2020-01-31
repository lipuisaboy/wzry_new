<template>
  <div class="tab-bar">
    <tab-bar :title="titles"></tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from '../components/common/TabBar'

export default {
  components:{
   TabBar
  },
  data(){
    return{
      titles:['首页','攻略中心','赛事中心'],
    }
  }
}
</script>