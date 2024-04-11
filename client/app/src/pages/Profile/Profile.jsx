import React, { useEffect, useState } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Image, NavBar, Toast, Flex, Tabs, Cell, Dialog } from 'react-vant'
import { Edit, Revoke } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.scss'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'

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

  //触发个人用户信息action
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])


  const userName = useSelector(state => state.user.userInfo.userName)
  const userImgUrl = 'https://img.yzcdn.cn/vant/cat.jpeg'

  const onTabChange = (path) => {
    console.log('切换路由：', path)
    navigate(`/profile${path}`)
  }

  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false)

  return (
    <div className="layout">
      <NavBar
        className='nav-bar'
        title='我的'
        leftText={<Edit fontSize={20} />}
        onClickLeft={() => navigate('/userDetail')}
        rightText='退出'
        onClickRight={() => setLogoutDialogVisible(true)}
      />

      <Dialog
        visible={logoutDialogVisible}
        title='确认退出当前账号？'
        showCancelButton
        onConfirm={() => {
          console.log('确认退出')
          dispatch(clearUserInfo())
          navigate('/login')
        }}
        onCancel={() => setLogoutDialogVisible(false)}
      />

        <div className="container">
          <div className='top-layout'>
            <div className='profile-img'>
              <Image round fit='cover' src={userImgUrl} />
            </div>
            <div className='profile-username'>{userName}</div>

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