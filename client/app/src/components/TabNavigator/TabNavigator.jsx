import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './TabNavigator.scoped.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { getUserId as _getUserId } from '@/utils'

const TabNavigator = () => {

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
      // key: `/profile/${loginUserId}/myPost`,
      title: '我的',
      icon: <UserO />,
    },
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [loginUserId, setLoginUserId] = useState()
  const [activeTab, setActiveTab] = useState(location.pathname === '/' ? '/home' : location.pathname)

  //当前登录用户
  useEffect(() => {
    setLoginUserId(_getUserId)
  }, [])

  const { userInfo } = useSelector(state => state.user.userInfo)
  console.log('redux中的userInfo：', userInfo)
  // useEffect(() => {
  //   dispatch(fetchUserInfo())
  // }, [dispatch])

  const onClickTabbar = (path) => {
    setActiveTab(path)
    navigate(path)
  }

  return (
    <div className="tab-bar">
      <ul>
        <li
          className={`tab-item ${activeTab === '/home' ? 'active active__home' : ''} `}
          onClick={() => onClickTabbar('/home')}
        >
          {activeTab === '/home' ?
            <div className='active-icon'>
              <HomeO className='tab-bar-icon' />
              <div>Home</div>
            </div>
            : <HomeO className='tab-bar-icon' />}
        </li>

        <li
          className={`tab-item ${activeTab === '/discover' ? 'active active__discover' : ''} `}
          onClick={() => onClickTabbar('/discover')}
        >
          {activeTab === '/discover' ?
            <div className='active-icon'>
              <Search className='tab-bar-icon' />
              <div>Discover</div>
            </div>
            : <Search className='tab-bar-icon' />}
        </li>

        <li
          className={`tab-item ${activeTab === '/post' ? 'active active__post' : ''} `}
          onClick={() => onClickTabbar('/post')}
        >
          {activeTab === '/post' ?
            <div className='active-icon'>
              <AddO className='tab-bar-icon' />
              <div>Post</div>
            </div>
            : <AddO className='tab-bar-icon' />}
        </li>

        <li
          className={`tab-item ${activeTab === '/message' ? 'active active__message' : ''} `}
          onClick={() => onClickTabbar('/message')}
        >
          {activeTab === '/message' ?
            <div className='active-icon'>
              <CommentO className='tab-bar-icon' />
              <div>Message</div>
            </div>
            : <CommentO className='tab-bar-icon' />}
        </li>

        <li
          className={`tab-item ${activeTab === `/profile/${loginUserId}/myPost` ? 'active active__profile' : ''} `}
          onClick={() => onClickTabbar(`/profile/${loginUserId}/myPost`)}
        >
          {activeTab === `/profile/${loginUserId}/myPost` ?
            <div className='active-icon'>
              <UserO className='tab-bar-icon' />
              <div>Profile</div>
            </div>
            : <UserO className='tab-bar-icon' />}
        </li>
      </ul>
    </div>

  )
}

export default TabNavigator