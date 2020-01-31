import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import http from './network/network'
import './assets/icon-font/font_1623642_3naxyn6skox/iconfont.css'
Vue.prototype.$http = http

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

import './assets/css/base.scss'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
