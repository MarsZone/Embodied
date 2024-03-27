//创建路由示例 绑定path element

import { createBrowserRouter } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Home from '@/pages/Home/Home' //主页
import Profile from '@/pages/Profile/Profile' //个人信息页
import Discover from '@/pages/Discover/Discover' //发现页
import Post from '@/pages/Post/Post' //新贴发布页
import Message from '@/pages/Message/Message' //消息页
import Login from '@/pages/Login/Login' //登录页
import Register from '@/pages/Register/Register' //注册页
import Test from '@/pages/Test' //测试页



const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoute> <Home /> </AuthRoute>,
  },
  {
    path: '/home',
    element: <AuthRoute> <Home /> </AuthRoute>
  },
  {
    path: '/discover',
    element: <AuthRoute> <Discover /> </AuthRoute>, 
    children: [
      {
        index: true,
        element: <Discover />
      },
      {
        path: 'message',
        element: <Message />
      }
    ]
  },
  {
    path: '/post',
    element: <Post />
  },
  {
    path: '/message',
    element: <Message />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/test',
    element: <Test />
  },
])

export default router