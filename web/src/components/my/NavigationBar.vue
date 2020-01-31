<template>
  <div class="navigation bg-white mt-3">
    <ul class="d-flex" :class="{active:isShou}">
      <li>
        <i class="a">
        </i>
        <span>爆料站</span>
      </li>
      <li>
        <i class="b">
        </i>
        <span>故事站</span>
      </li>
      <li>
        <i class="c">
        </i>
        <span>周边商城</span>
      </li>
      <li>
        <i class="d">
        </i>
        <span>体验服</span>
      </li>
      <li>
        <i class="e">
        </i>
        <span>新人专区</span>
      </li>
      <li>
        <i class="f">
        </i>
        <span>荣耀·传承</span>
      </li>
      <li>
        <i class="g">
        </i>
        <span>模拟战资料库</span>
      </li>
      <li>
        <i class="h">
        </i>
        <span>王者营地</span>
      </li>
      <li>
        <i class="i">
        </i>
        <span>公众号</span>
      </li>
      <li>
        <i class="j">
        </i>
        <span>版本介绍</span>
      </li>
      <li>
        <i class="k">
        </i>
        <span>对局环境</span>
      </li>
      <li>
        <i class="l">
        </i>
        <span>无限王者团</span>
      </li>
      <li>
        <i class="m">
        </i>
        <span>创意互动营</span>
      </li>
    </ul>
    <div class="bottom bg-body" @click="shouClick()" v-if="!isShou">
      <i></i>
      <span>收起</span>
    </div>
    <div class="bottom2 bg-body" v-if="isShou" @click="openClick()">
      <i></i>
      <span>展开</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShou:true
    }
  },
  methods:{
    shouClick(){
      this.isShou = !this.isShou
      window.console.log(this.isShou)
    },
    openClick(){
      this.isShou = !this.isShou
    }
  }
}
</script>

<style lang="scss">
  .navigation{
    &.active{
      overflow: hidden;
      height: 5.3846rem;
    }
    ul{
      padding: 0;
      margin: 0;
      list-style-type: none;
      flex-wrap: wrap;
      &.active{
        overflow: hidden;
        height: 70px;
      }
      li{
        height: 3.8462rem;
        width: 7.2154rem;
        text-align: center;
        margin: 0.7692rem 0;
        border-right: 1px solid #cacaca;
        position: relative;
        &:nth-child(4n){
          border-right: none;
        }
        i{
          top: 8px;
          position: relative;
          text-align: center;
          display: inline-block;
          width: 1.7692rem;
          height: 1.5385rem;
          background: url('../../assets/img/index.png') no-repeat 0 0;
          background-size: 375px 455px;
          &.a{
            background-position: -224px -67px;
          }
          &.b{
            background-position: -318px -68px;
          }
          &.c{
            background-position: -131px -4px;
            height: 1.6923rem;
            width: 1.4615rem;
          }
          &.d{
            background-position: -37px -67px;
            width: 1.5385rem;
            height: 1.5385rem;
          }
          &.e{
            background-position: -319px -5px;
            width: 1.5385rem;
            height: 1.6154rem;
          }
          &.f{
            background-position:  -128px -66px;
            width: 1.8462rem;
            height: 1.5385rem;
          }
          &.g{
            background-position: -32px -3px;
            width: 2.3846rem;
            height: 1.9231rem;
          }
          &.h{
            background-position: -222px -4px;
            width: 1.8462rem;
            height: 1.8462rem;
          }
          &.i{
            background-position:  0 -418px;
            width: 1.8462rem;
            height: 1.5385rem;
          }
          &.j{
            background: url('../../assets/img/version-icon.png') no-repeat center center;
            background-size: 25px 25px;
            height: 1.8462rem;
            width: 1.8462rem;
          }
          &.k{
            background: url('../../assets/img/djhj.png') no-repeat center center;
            background-size: 34px 21px;
            width: 2.6154rem;
            height: 1.6154rem;
          }
          &.l{
            background: url('../../assets/img/wxwzt.png') no-repeat 0 0;
            background-size: 46px 17px;
            width: 3.5385rem;
            height: 1.3077rem;
          }
          &.m{
            background: url('../../assets/img/cyhdy.png') no-repeat -3px -5px;
            background-size: 42px 39px;
            width: 3.2308rem;
            height: 2.6923rem;
          }
        }
        span{
          position: absolute;
          display: block;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: 0.9231rem;
        }
      }
    }
    .bottom{
      height: 2.3077rem;
      text-align: center;
      line-height: 2.3077rem;
      i{
        display: inline-block;
        background: url('../../assets/img/index.png') no-repeat -141px -232px;
        background-size: 375px 455px;
        width: 0.7692rem;
        height: 0.7692rem;
        margin-right: 0.2308rem;
      }
    }
    .bottom2{
      height: 2.3077rem;
      text-align: center;
      line-height: 2.3077rem;
      i{
        display: inline-block;
        background: url('../../assets/img/index.png') no-repeat -141px -232px;
        background-size: 375px 455px;
        width: 0.7692rem;
        height: 0.7692rem;
        margin-right: 0.2308rem;
        transform: rotate(180deg);
      }
    }
  }
</style>