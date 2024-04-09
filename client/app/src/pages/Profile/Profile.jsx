import React, { useEffect } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Image, NavBar, Toast, Flex, Tabs } from 'react-vant'
import { Edit } from '@react-vant/icons'
import { useDispatch } from 'react-redux'
import './Profile.scss'
import { fetchUserInfo } from '@/store/modules/user'

const Profile = () => {
  const tabs = [
    {
      key: '/myPost',
      title: "我的创作"
    },
    {
      key: '/like',
      title: "点赞"
    },
    {
      key: '/bookmark',
      title: "收藏"
    }];

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])

  

  const src = 'https://img.yzcdn.cn/vant/cat.jpeg'

  const onTabChange = (path) => {
    console.log('切换路由：', path)
    navigate(`/profile${path}`)
  }

  return (

    <div className="layout">

      <NavBar
        className='nav-bar'
        title='我的'
        leftText='返回'
        onClickLeft={() => Toast('返回')}
        rightText={<Edit fontSize={20} />}
        onClickRight={() => navigate('/userDetail')}
      />

      <div className="container">
        <div className='top-layout'>
          <div className='profile-img'>
            <Image round fit='cover' src={src} />
          </div>
          <div className='profile-username'>Embodied</div>

          <div className='profile-social'>
            <Flex gutter={16}>
              <Flex.Item span={8}>
                关注<div className='count'>111</div>
              </Flex.Item>
              <Flex.Item span={8}>
                粉丝<div className='count'>222</div>
              </Flex.Item>
              <Flex.Item span={8}>
                获赞<div className='count'>333</div>
              </Flex.Item>
            </Flex>
          </div>
        </div>

        <div className='bottom-layout'>
          <Tabs
            className='profile-tabs'
            defaultActive={tabs[0].key}
            onChange={(name, tabIndex) => onTabChange(name)}>
            {tabs.map(
              item => (
                <Tabs.TabPane name={item.key} key={item.key} title={item.title}>
                  <div>
                    <Outlet />
                  </div>
                </Tabs.TabPane>
              )
            )}
          </Tabs>
        </div>

      </div>


      <div className="footer">
        <TabNavigator />
      </div>


    </div>
  )
}

export default Profile