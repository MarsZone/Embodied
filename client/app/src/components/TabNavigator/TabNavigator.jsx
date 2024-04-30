import React, { useDebugValue, useEffect, useState } from 'react'
import { GridItem, Tabbar, TabbarItem } from 'react-vant'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './TabNavigator.scoped.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'

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
  const [tabRoute, setTabRoute] = useState(location.pathname === '/' ? '/home' : location.pathname)

  //点击事件
  const onTabbarClick = (route) => {
    console.log('tabbar被点击了', route)
    navigate(route)
    setTabRoute(route)
  }

  //触发个人用户信息action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  return (
    <div>
      {/* <Tabbar value={tabRoute} selectedKey={selectedKey} onChange={v => onTabbarClick(v)}></Tabbar> */}
      <Tabbar
        value={tabRoute}
        onChange={v => onTabbarClick(v)}
        activeColor='#f44336' inactiveColor='#000'
        placeholder
        fixed
      >
        {tabs.map(item => (
          <TabbarItem key={item.key} name={item.key} icon={item.icon}>{item.title}</TabbarItem>
        ))}
      </Tabbar>
    </div>
  )
}

export default TabNavigator

