import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Image, NavBar, Toast } from 'react-vant'
import './Profile.scss'

const Profile = () => {

  const src = 'https://img.yzcdn.cn/vant/cat.jpeg'

  return (

    <div className="layout">


      <div className="container">
        <div className='profile-info'>
          <div className='profile-img'>
            <Image round fit='cover' src={src} />
          </div>
          <div className='profile-description'>该用户还没有写简介</div>

        </div>
        我是用户信息页Profile
        {/* <Outlet /> */}
      </div>




      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Profile