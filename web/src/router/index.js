import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/home/Home'
import Main from '../view/Main'
import Hero from '../view/hero/Hero'
import MainArticle from '../view/text/MainArticle'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children:[
      {
        path: '/',
        name: 'home',
        component:Home
      },
      {
        path:'/article/:id',
        name:'main-article',
        component: MainArticle,
        props:true
      },
    ]
  },
  {
    path: '/hero/:id',
    name: 'hero',
    component: Hero,
    props:true
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router