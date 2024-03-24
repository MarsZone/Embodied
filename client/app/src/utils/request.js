//axios的封装处理
import axios from "axios";
//1.根域名配置
//2.超时时间
//3.请求拦截器 / 响应拦截器

axios.defaults.crossDomain = true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

const request = axios.create({
  baseURL: 'http://120.78.142.84:8080', //根域名配置
  withCredentials: true,
  // baseURL: 'http://127.0.0.1:4523/m1/4182675-0-default',
  timeout: 5000 //超时时间设置为5s
})



//添加请求拦截器：在请求发送之前做拦截，插入一些自定义的配置
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

//添加响应拦截器：在响应返回到客户端之前做拦截，重点处理返回的数据
request.interceptors.response.use((response) => {
  //2xx 范围内的状态码都会触发该函数
  //对响应数据做点什么
  return response.data
}, (error) => {
  //超出2xx范围的状态码都会触发该函数
  //对响应错误做点什么
  return Promise.reject(error)
})


export { request } //导出实例对象request