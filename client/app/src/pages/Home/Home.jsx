import React from 'react'
import { Tabbar, TabbarItem } from 'react-vant'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './home.scss'

const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: <HomeO />,
  },
  {
    key: '/discover',
    title: '发现',
    icon: <Search />,
  },
  {
    key: '/post',
    title: '发布',
    icon: <AddO />,
  },
  {
    key: '/message',
    title: '消息',
    icon: <CommentO  />,
  },
  {
    key: '/profile',
    title: '我的',
    icon: <UserO  />,
  },
]


const Home = () => {
  return (

    <div className="layout">
      <div className="container">
        {/* <Outlet /> */}
      </div>
      <div className="footer">
        <Tabbar>
          {tabs.map(item => (
            <Tabbar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </Tabbar>
      </div>
    </div>

    // <div className='demo-tabbar'>
    //   <Tabbar>
    //     <Tabbar.Item icon={<HomeO />}>标签</Tabbar.Item>
    //     <Tabbar.Item icon={<Search />}>标签</Tabbar.Item>
    //     <Tabbar.Item icon={<FriendsO />}>标签</Tabbar.Item>
    //     <Tabbar.Item icon={<SettingO />}>标签</Tabbar.Item>
    //   </Tabbar>
    // </div>
  )
}

export default Home

