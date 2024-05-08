import React, { useEffect, useState } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Image, NavBar, Toast, Flex, Tabs, Cell, Dialog, Space, Typography, } from 'react-vant'
import { Edit, Revoke } from '@react-vant/icons'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, fetchUserInfo } from '@/store/modules/user'

const OtherProfile = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //触发个人用户信息action
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])


  //const userName = useSelector(state => state.user.userInfo.userName)
  const userImgUrl = 'https://img.yzcdn.cn/vant/cat.jpeg'


  return (
    <div className="layout">
      <NavBar
        className='nav-bar'
        title='我的'
      />

      {/* <div className="container"> */}

      <div className='top-layout'>
        <div className='profile-img'>
          <Image round fit='cover' src={userImgUrl} />
        </div>
        {/* <div className='profile-username'>{userName}</div> */}

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

      </div>
    </div>
  )
}

export default OtherProfile