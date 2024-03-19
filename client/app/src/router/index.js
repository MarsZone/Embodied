//创建路由示例 绑定path element

import Home from '@/pages/Home/Home' //主页
import Profile from '@/pages/Profile/Profile' //个人信息页
import Discover from '@/pages/Discover/Discover' //发现页
import Post from '@/pages/Post/Post' //新贴发布页
import Message from '@/pages/Message/Message' //消息页

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/discover',
    element: <Discover />,
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
  }
])

export default router