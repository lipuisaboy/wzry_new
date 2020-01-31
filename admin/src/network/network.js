import axios from 'axios'
import Vue from 'vue'
import router from '../router/index.js'

const request = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/wzry/api',
})

//拦截器
request.interceptors.request.use(config => {
  if(localStorage.token){
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
},err => {
  return Promise.reject(err)
})

request.interceptors.response.use(res => {
  return res
},err => {
  if(err.response.data.message){
    Vue.prototype.$message({
      type:'error',
      message: err.response.data.message
    }) 
   
    if(err.response.status === 401){
      router.push('/login')
    }
  } 
  return Promise.reject(err)
})
export default request