<template>
  <div class="hero">
    <div class="tab-title bg-title d-flex ai-center py-2 pl-3">
        <img src="../../assets/img/logo.png" alt="">
        <div class="font f-1 ml-2 f-w">
          <span class="t-white">王者荣耀</span>
          <span class="t-white ml-3">攻略站</span>
        </div>
         <a href="https://pvp.qq.com/m/m201706/heroList.shtml"
           class="t-font t-center t-white fs-m mr-3 mt-1 d-flex">
          <span class="more mr-3">更多英雄</span>
          <span class="icon fs-xl f-w">&gt;</span>
        </a>
    </div>
    <div class="bg" v-if="hero" :style="{'background-image':`url(${hero.bg})`}">
      <div class="info t-white d-flex f-column jc-end p-3">
        <div class="fs-ok">{{hero.title}}</div>
        <h2 class="my-2 fs-h2">{{hero.name}}</h2>
        <div class="fs-ok mb-1">{{hero.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between">
          <div class="skill" v-if="hero.scores">
             <span>难度</span>
             <span class="scores bg-difficult">{{hero.scores.difficult}}</span>
             <span>技能</span>
             <span class="scores bg-skill">{{hero.scores.skills}}</span>
             <span>攻击</span>
             <span class="scores bg-attach">{{hero.scores.attack}}</span>
             <span>生存</span>
             <span class="scores bg-live">{{hero.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="t-grey fs-ok mr-1">
            皮肤:5 &gt;
          </router-link>
        </div>
      </div>
    </div>
    <div class="tab-body px-3 bg-white">
      <div class="body-head d-flex jc-around">
        <div class="item" 
        v-for="(item,index) in title" :key="index" @click="itemClick(index)" 
        :class="{active: index===currentIndex}" >
          <span>{{item}}</span>
        </div>
      </div>
      <div class="body-skill d-flex jc-between mt-3">
        <div class="item d-flex">
          <img src="../../assets/img/video.png" alt="">
          <div>英雄介绍视频</div>
        </div>
        <div class="item d-flex">
          <img src="../../assets/img/image.png" alt="">
          <div>一图识英雄</div>
        </div>
      </div>
      <div class="skills bg-white mt-2"> 
        <div>
          <ul class="d-flex jc-between px-2 py-2">
            <li v-for="(skill,index) in hero.skills" :key="index" 
                @click="iconClick(index)">
              <img :src="skill.icon" alt="">
            </li>
          </ul>
        </div>
        <div class="mt-3">
          <ul>
            <li class="skills-info" v-for="(info,index) in hero.skills" :key="index" 
                :class="{show: index===iconIndex}">
              <span class="f-w fs-skill mr-5">{{info.name}}</span>
              <span class="t-grey fs-ok">{{info.delay}}</span>
              <p class="py-4">{{info.description}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="items bg-white mt-3 px-3">
      <div class="items-title">
        <span class="iconfont icon-xiangguan fs-ic"></span>
        <span class="f-w fs-xl ml-3">出装推荐</span>
      </div>
      <div class="items-body">
        <div class="body-1">
          <div class="fs-skill mb-4">顺风出装</div>
          <ul class="d-flex jc-between">
            <li v-for="(item1,index) in item1" :key="index">
              <img :src="item1.icon" alt="">
              <p class="fs-s my-1 t-center">{{item1.name}}</p>
            </li>
          </ul>
        </div>
        <div class="body-2 mt-3">
          <div class="fs-skill mb-4">逆风出装</div>
          <ul class="d-flex jc-between">
            <li v-for="(item,index) in hero.item2" :key="index">
              <img :src="item.icon" alt="">
              <p class="fs-s my-1 t-center">{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="hero-use mt-3 bg-white px-3">
        <div class="use-title">
          <span class="iconfont icon-more fs-ic mr-3"></span>
          <span class="f-w fs-xl">使用技巧</span>
        </div>
        <div class="use-body">
          <p>{{hero.useTips}}</p>
        </div>
    </div>
    <div class="hero-use mt-3 bg-white px-3">
        <div class="use-title">
          <span class="iconfont icon-more fs-ic mr-3"></span>
          <span class="f-w fs-xl">对抗技巧</span>
        </div>
        <div class="use-body">
          <p>{{hero.battleTips}}</p>
        </div>
    </div>
    <div class="hero-use mt-3 bg-white px-3">
        <div class="use-title">
          <span class="iconfont icon-more fs-ic mr-3"></span>
          <span class="f-w fs-xl">团战思路</span>
        </div>
        <div class="use-body">
          <p>{{hero.teamTips}}</p>
        </div>
    </div>
    <div class="hero-use mt-3 bg-white px-3">
        <div class="use-title">
          <span class="iconfont icon-more fs-ic mr-3"></span>
          <span class="f-w fs-xl">英雄关系</span>
        </div>
        <div class="friend">
          <div style="font-size:15px">最佳搭档</div>
          <ul class="mt-3">
            <li class="d-flex mb-3" v-for="(item,index) in friend" :key="index">
              <img :src="item.hero.avatar" alt="">
              <p class="pl-3">{{item.description}}</p>
            </li>
          </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    id:{
      type:String,
      required:true
    }
  },
  data(){
    return{
      hero:{},
      title:['英雄初识','进阶攻略'],
      currentIndex:0,
      iconIndex:0,
      item1:{},
      friend:{}
    }
  },
  created(){
    this.fetch()
    this.getItem1()
    this.getFriend()
  },
  methods:{
    fetch(){
      this.$http.get(`/common/heroes/${this.id}`).then(res => {
        this.hero = res.data
      })
    },
    getItem1(){
      this.$http.get(`/item1/${this.id}`).then(res => {
        this.item1 = res.data.item1
      })
    },
    getFriend(){
      this.$http.get(`/friend/${this.id}`).then(res => {
        this.friend = res.data.partners
      })
    },
    itemClick(index){
      this.currentIndex = index;
      window.console.log(index)
    },
    iconClick(index){
      this.iconIndex = index;
    }
  }
}
</script>

<style lang="scss">
.hero{
  .tab-title{
    height: 3.4615rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    .font{
      line-height: 2.3846rem;
    }
    img{
      height: 2.3077rem
    }
    a{
      color: white;
      height: 2.3846rem;
      line-height: 2.3846rem;
      .more{
        font-size: 0.8462rem;
      }
    }
  }
  .bg{
    margin-top: 3.4615rem;
    height: 14.6923rem;
    width: 100%;
    background: #fff no-repeat;
    background-size: 100% 100%;
    .info{
      height: 100%;
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
      .skill{
        span{
          font-size: 0.9231rem;
          margin-right: 0.5385rem;
        }
        .scores{
          text-align: center;
          display: inline-block;
          border-radius: 50%;
          width: 0.9231rem;
          height: 0.9231rem;
          line-height: 0.9231rem;
          font-size: 0.2308rem;
          border: 1px solid rgba(255,255,255,0.2)
        }
      }
    }
  }
  .tab-body{
    .body-head{
      font-weight: 500;
      height: 2.8846rem;
      line-height: 2.8846rem;
      border-bottom: 1px solid #d4d9de;
      .item{
        &.active{
          span{
            padding: 2px;
            color: #d59b40;
            border-bottom: 2px solid #d59b40;
          }
        }
      }
    }
    .body-skill{
      .item{
        height: 3rem;
        width: 13.2308rem;
        padding-left: 2.3077rem;
        border: 1px solid #eaeaea;
        background-color: #fcfcfc;
        border-radius: 0.3846rem;
        div{
          line-height: 3rem;
        }
        img{
          width: 1.5385rem;
          height: 1.5385rem;
          margin-top: 0.6154rem;
          margin-right: 0.7692rem;
        }
      }
    }
  }
  .skills{
    img{
      width: 5rem;
      height: 5rem;
    }
    .skills-info{
      display:none;
      &.show{
        display:block;
      }
      p{
        margin: 0;
        line-height: 1.6rem;
      }
    }
  }
  .items{
    .items-title{
       height: 3.4615rem;
       line-height: 3.4615rem;
    }
    .items-body{
      .body-1{
        border-bottom: 1px solid #d4d9de;
      }
      img{
        width: 3.5769rem;
        height: 3.5769rem;
        border-radius: 50%;
      }
    }
  }
  .hero-use{
    p{
      margin: 0;
      line-height: 1.6rem;
    }
    .use-title{
      height: 3.4615rem;
      line-height: 3.4615rem;
    }
    .friend{
      ul{
        li{
           img{
              height: 3.6923rem;
              width: 3.6923rem;
          }
        }
      }
    }
  }
}
</style>