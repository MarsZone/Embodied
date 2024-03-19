//创建路由示例 绑定path element

import Layout from '@/pages/Layout'
import Month from '@/pages/Month'
import New from '@/pages/Discover/Discover'
import Year from '@/pages/Message/Message'
import Test from '@/pages/Test'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Month />
      },
      {
        path: 'year',
        element: <Year />
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  },
  {
    path: '/test',
    element: <Test />
  }
])

export default router