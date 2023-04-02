import axios from 'axios'
import {message} from 'antd'
import Nprgresss from 'nprogress'
import 'nprogress/nprogress.css'
import moment from 'moment'
import {Cache} from './cache'


const instance = axios.create({
  timeout:4000
})

//请求拦截器
instance.interceptors.request.use(function(config){
    Nprgresss.start()
    config.headers['x-access-token'] = Cache.localGet("token")  //config里就是可以统一配置request请求的参数，headers就可以在这设置
    const {method,data} = config
    console.log("config=======>     ",config)
    console.log("请求方式为：  "+method,"     请求参数为：  ",data,"     时间：  ",moment().format("yyyy-MM-DD HH:mm:ss"))
    return config;
})

//响应拦截器
instance.interceptors.response.use(
  respons=>{
   Nprgresss.done()
      if(respons.data.code === 403){
          window.location.href = "localhost:3000/backLogin"
      }
   return respons.data;
}, (error => {
   Nprgresss.done()
    message.error(error.message,2);
    return new Promise(()=>{})
  })
  )

export default instance