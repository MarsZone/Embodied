import React, { useDebugValue, useEffect, useState } from 'react'
import { GridItem, Tabbar, TabbarItem } from 'react-vant'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './TabNavigator.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { tab } from '@testing-library/user-event/dist/tab'

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

  const [tabRoute, setTabRoute] = useState('/home')

  const onTabbarClick = (route) => {
    console.log('tabbar被点击了', route)
    setTabRoute(route)
    navigate(route)
  }

  //反向高亮
  // console.log(location.pathname)//获取当前路由路径
  // const selectedKey = location.pathname

  // const [selectedKey, setSelectedKey] = useState(location.pathname)
  // useEffect(() => {
  //   setSelectedKey(location.pathname)
  // }, [location.pathname])

  return (
    // <Tabbar value={tabRoute} selectedKey={selectedKey} onChange={v => onTabbarClick(v)}></Tabbar>
    <Tabbar value={tabRoute} onChange={v => onTabbarClick(v)}>
      {tabs.map(item => (
        <TabbarItem key={item.key} name={item.key} icon={item.icon}>{item.title}</TabbarItem>
      ))}
    </Tabbar>
  )
}

export default TabNavigator

