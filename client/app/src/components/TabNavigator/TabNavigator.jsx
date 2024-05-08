import React, { useEffect, useState } from 'react'
import { Tabbar, TabbarItem } from 'react-vant'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './TabNavigator.scoped.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/user'
import { getUserId as _getUserId } from '@/utils'



const TabNavigator = () => {

  const [loginUserId, setLoginUserId] = useState()
  const { userId } = useParams()

  //当前登录用户
  useEffect(() => {
    //const loginUsername = _getUserId
    setLoginUserId(_getUserId)
  }, [])

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
      key: `/profile/${loginUserId}/myPost`,
      title: '我的',
      icon: <UserO />,
    },
  ]

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

