//和用户相关的状态管理

import { createSlice } from '@reduxjs/toolkit'
import { request } from '@/utils'
import { setToken as _setToken, getToken} from '@/utils'

const userStore = createSlice({
  name: "user", //模块名
  //数据状态
  initialState: {
    token: localStorage.getItem('token_key') || '' //后端返回的类型是什么，这里的类型就是什么（这里是类型String）
  },
  //同步修改方法
  reducers: {
    setToken(state, action) {
      //state.token --> 拿到上面的state数据
      //action.payload --> 把action对象中payload载荷赋值给state，做到同步修改
      state.token = action.payload
    }
  }
})

//解构出actionCreater
const { setToken } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {

    try {

    //1.发送异步请求
    const res = await request.post(
      '/users/login', 
      loginForm,
      { withCredentials: true }
    )
    //const res = await request.get('/api/users/userDetail')

    //从Header中获取cookie中的token --> 好像获取不到cookie，暂时注释
    //const cookieHeader = res.headers['set-cookie']
    //const token = extractToken(cookieHeader)

    //2.提交同步action进行token的存入
    //dispatch(setToken(token))
    console.log(res)
    console.log('Login successful：', res.data)
    console.log(res.headers)
    console.log('Cookies：', document.cookie)
    //console.log(res.headers['set-cookie'])

    //localStorage存一份token
    //localStorage.setItem('token_key', token)

    } catch (error) {
      console.log('Login failed：', error)
    }
  }
}


function extractToken(cookieHeader) {
  //解析 Cookie 头部，提取 token
  //例如：cookieHeader 可能是 "satoken=57a0c229-8939-4789-aeb2-ba334de54348"
  const token = cookieHeader.split('=')[1]
  return token
}


//导出
export { fetchLogin, setToken }
export default userReducer