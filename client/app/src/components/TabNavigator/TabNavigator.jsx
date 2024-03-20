import React from 'react'
import { Tabbar, TabbarItem } from 'react-vant'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './TabNavigator.scss'
import { useNavigate } from 'react-router-dom'

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

  const [tabPath, setTabPath] = React.useState('/home')
  const navigate = useNavigate()

  const switchRoute = (path) => {
    console.log(path)
    navigate(path.key)
    setTabPath(path)
  }

  return (

    <Tabbar value={tabPath} onChange={v => switchRoute(v)}>
      {tabs.map(item => (
        <TabbarItem key={item.key} name={item.key} icon={item.icon} path={item.path} >{item.title}</TabbarItem>
      ))}
    </Tabbar>
  )
}

export default TabNavigator

