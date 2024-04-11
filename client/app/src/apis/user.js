//用户相关的所有请求
import { request } from "@/utils";

//1.登录请求
export function loginAPI(formData) {
  //以下写法是axios的通用写法，任何一个请求都可以这样写
  return request({ //return返回的结果是一个promise 调用这个函数可以用async await接收返回值
    url: '/api/users/login',
    method: 'POST',
    data: formData,
    withCredentials: true
  })
}

//2.获取用户信息
export function getProfileAPI(userId) {
  //以下写法是axios的通用写法，任何一个请求都可以这样写
  return request({ //return返回的结果是一个promise 调用这个函数可以用async await接收返回值
    url: '/api/users/userDetail',
    method: 'GET',
    data: {
      params: {
        uid: userId
      }
    },
    withCredentials: true
  })
}
