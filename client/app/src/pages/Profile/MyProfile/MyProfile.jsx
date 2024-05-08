import React, { useEffect, useState } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Outlet, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Image, NavBar, Toast, Flex, Tabs, Cell, Dialog, Space, Typography, } from 'react-vant'
import { Edit, Revoke } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'
import './MyProfile.scoped.scss'
import useUserDetail from '@/hooks/useUserDetail'
import { getUserId as _getUserId } from '@/utils'

const MyProfile = () => {
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
  const { userId } = useParams()

  const { userProfile, avatarUrl } = useUserDetail(_getUserId())
  console.log('用户详情：', userProfile, '头像url：', avatarUrl)

  const username = userProfile.userName
  const userImgUrl = 'https://img.yzcdn.cn/vant/cat.jpeg'

  const onTabChange = (path) => {
    console.log('切换路由：', path)
    navigate(`/profile/${userId}${path}`)
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

      {/* <div className="container"> */}

      <div className='top-layout'>
        <div className='profile-img'>
          <Image round fit='cover' src={userImgUrl} />
        </div>
        <div className='profile-username'>{username}</div>

        <div className='profile-social'>
          <Space
            align="center"
            gap={40}>
            <Typography.Link>
              关注<div className='count'>111</div>
            </Typography.Link>
            <Typography.Link>
              粉丝<div className='count'>222</div>
            </Typography.Link>
            <Typography.Link>
              获赞<div className='count'>333</div>
            </Typography.Link>
          </Space>
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

      {/* </div> */}


      <div className="footer">
        <TabNavigator />
      </div>


    </div>
  )
}

export default MyProfile