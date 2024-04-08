//和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { setToken as _setToken, getToken as _getToken} from '@/utils'

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
    setUserInfo(state, action){
      state.userInfo = action.payload
    }
  }
})

//解构出actionCreater
const { setToken, setUserInfo } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    //1.发送异步请求
    const res = await request.post(
      '/api/users/login', 
      loginForm,
      { withCredentials: true }
    )
    //2.提交同步action进行token的存入
    console.log('发送的数据：', loginForm)
    console.log('登录成功：', res.data)
    console.log('Cookies：', document.cookie)

    const token = res.data.tokenValue
    dispatch(setToken(token))

    //localStorage存一份token
    _setToken(token)
  }
}


//异步方法 获取个人用户信息
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = request.get('/api/users/userDetail')
    dispatch(setUserInfo(res.data))
  }
}


//导出
export { fetchLogin, fetchUserInfo, setToken }
export default userReducer