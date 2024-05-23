//和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { removeToken, removeUserId, request } from '@/utils'
import {
  setToken as _setToken, getToken as _getToken,
  setUserId as _setUserId, getUserId as _getUserId
} from '@/utils'
import { loginAPI, getProfileAPI } from '@/apis/user'


const userStore = createSlice({
  name: "user", //模块名
  //数据状态
  initialState: {
    token: _getToken() || '', //后端返回的类型是什么，这里的类型就是什么（这里是类型String）
    userInfo: {}
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      //state.token --> 拿到上面的state数据
      //action.payload --> 把action对象中payload载荷赋值给state，做到同步修改
      state.token = action.payload
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
      removeUserId()
    }
  }
})

//解构出actionCreater
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    try {
      //1.发送异步请求
      const res = await loginAPI(loginForm)

      console.log('发送的数据：', loginForm)
      console.log('Cookies：', document.cookie)
      console.log('token：', res.data.tokenValue)
      
      const token = res.data.tokenValue; // 设置token参数
      // const sendMessage = WebSocketComponent('ws://localhost:8080/ws-connect?satoken='+res.data.tokenValue);// 调用SendMessageToUser组件并传入token参数

      const newSocket = new WebSocket('ws://localhost:8080/ws-connect?satoken='+res.data.tokenValue);
      newSocket.onopen = () => {
        console.log('WebSocket connected');
        newSocket.send("cmd:'10100'|target:''|msg:'广播消息，客户端发来的'")
        newSocket.send("cmd:'10200'|target:'2'|msg:'用户1发给用户2的消息'")
      };  
      newSocket.onmessage = (event) => {
        console.log('Message received:', event.data);
        // 在这里处理接收到的消息
      };  
      newSocket.onclose = () => {
        console.log('WebSocket disconnected');
      };


      if (res.code === 20000) {
        //2.提交同步action进行token的存入
        const token = res.data.tokenValue
        dispatch(setToken(token))

        //localStorage存一份token
        _setToken(token)

        //localStorage存一份uid
        _setUserId(res.data.loginId)
        console.log('userId：', _getUserId)

        return true

      } else {
        throw new Error('登录失败')
      }
    } catch (error) {
      throw error
    }
  }
}

//异步方法 获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI(_getUserId)
    dispatch(setUserInfo(res.data))
  }
}


//导出
export { fetchLogin, fetchUserInfo, setToken, clearUserInfo }
export default userReducer