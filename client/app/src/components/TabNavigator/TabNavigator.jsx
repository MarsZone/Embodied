import React, { useDebugValue, useEffect, useState } from 'react'
import { GridItem, Tabbar, TabbarItem } from 'react-vant'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './TabNavigator.scss'
import { useLocation, useNavigate } from 'react-router-dom'


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
    icon: <CommentO />,
  },
  {
    key: '/profile',
    title: '我的',
    icon: <UserO />,
  },
]

const TabNavigator = () => {

  const navigate = useNavigate()
  const location = useLocation()

  //设置当前选项
  const [tabRoute, setTabRoute] = useState(location.pathname)
  
  //点击事件
  const onTabbarClick = (route) => {
    console.log('tabbar被点击了', route)
    navigate(route)
    setTabRoute(route)
  }

  return (
    <div>
      {/* <Tabbar value={tabRoute} selectedKey={selectedKey} onChange={v => onTabbarClick(v)}></Tabbar> */}
      <Tabbar value={tabRoute} onChange={v => onTabbarClick(v)}>
        {tabs.map(item => (
          // <TabbarItem key={item.key} name={item.key} icon={item.icon}>{item.title}</TabbarItem>
          <TabbarItem key={item.key} name={item.key} icon={item.icon}>{item.title}</TabbarItem>
        ))}
      </Tabbar>
    </div>
  )
}

export default TabNavigator

