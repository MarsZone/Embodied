import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CommentO, HomeO, Search, UserO, AddO } from '@react-vant/icons'
import './index.scss'

const Test = () => {

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

  const [activeTab, setActiveTab] = useState('home')
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.user.userInfo)
  console.log('redux中的userInfo：', userInfo)
  // useEffect(() => {
  //   dispatch(fetchUserInfo())
  // }, [dispatch])

  return (
    <div>test page
      <div className="tab-bar">
        <ul>
          <li
            className={`tab-item ${activeTab === '/home' ? 'active' : ''} `}
            onClick={() => setActiveTab('/home')}
          >
            {activeTab === '/home' ? <div className='active-icon'><HomeO /> <div>home</div> </div> : <HomeO />}
          </li>

          <li
            className={`tab-item ${activeTab === '/discover' ? 'active' : ''} `}
            onClick={() => setActiveTab('/discover')}
          >
            discover
          </li>

          <li
            className={`tab-item ${activeTab === '/post' ? 'active' : ''} `}
            onClick={() => setActiveTab('/post')}
          >
            post
          </li>

          <li
            className={`tab-item ${activeTab === '/message' ? 'active' : ''} `}
            onClick={() => setActiveTab('/message')}
          >
            message
          </li>

          <li
            className={`tab-item ${activeTab === '/profile' ? 'active' : ''} `}
            onClick={() => setActiveTab('/profile')}
          >
            profile
          </li>
        </ul>
      </div>

    </div>
  )
}

export default Test