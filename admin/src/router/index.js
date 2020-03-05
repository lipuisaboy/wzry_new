import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/home/Home.vue'
import CategoryCreate from '../view/category/CategoryCreate.vue'
import CategoryList from '../view/category/CategoryList'
import ItemCreate from '../view/item/ItemCreate'
import ItemList from '../view/item/ItemList'
import HeroCreate from '../view/hero/HeroCreate'
import HeroList from '../view/hero/HeroList'
import ArticleCreate from '../view/article/ArticleCreate'
import ArticleList from '../view/article/ArticleList'
import AdCreate from '../view/ad/AdCreate'
import AdList from '../view/ad/AdList'
import AdminUserCreate from '../view/admin/AdminUserCreate'
import AdminUserList from '../view/admin/AdminUserList'
import Login from '../view/login/Login'

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name: 'home',
    component: Home,
    children:[
      {
        path:'/category/create',
        component: CategoryCreate
      },
      {
        path:'/category/edit/:id',
        component: CategoryCreate,
        props:true
      },
      {
        path:'/category/list',
        component: CategoryList
      },
      {
        path:'/item/create',
        component: ItemCreate
      },
      {
        path: '/item/edit/:id',
        component: ItemCreate,
        props: true
      },
      {
        path:'/item/list',
        component: ItemList,
      },
      {
        path: '/hero/create',
        component: HeroCreate
      },
      {
        path: '/hero/edit/:id',
        component: HeroCreate,
        props:true
      },
      {
        path: '/hero/list',
        component: HeroList
      },
      {
        path: '/article/create',
        component: ArticleCreate
      },
      {
        path: '/article/edit/:id',
        component: ArticleCreate,
        props: true
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/ad/create',
        component: AdCreate
      },
      {
        path: '/ad/edit/:id',
        component: AdCreate,
        props: true
      },
      {
        path: '/ad/list',
        component: AdList
      },
      {
        path: '/admin/create',
        component: AdminUserCreate
      },
      {
        path: '/admin/edit/:id',
        component: AdminUserCreate,
        props: true
      },
      {
        path: '/admin/list',
        component: AdminUserList
      }
    ]
  },
  {
    path:'/login',
    name: 'login',
    component: Login,
    meta:{isPublic: true}
  }
]

const router = new VueRouter({
  routes,
  // mode:'history'
})

router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})
export default router