import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Image, NavBar, Toast } from 'react-vant'
import './Profile.scss'

const Profile = () => {

  const src = 'https://img.yzcdn.cn/vant/cat.jpeg'

  return (

    <div className="layout">
      <div className='profile-background'>
        <NavBar className='top-bar'
          title="个人主页"
          leftText="返回"
          rightText="按钮"
          onClickLeft={() => Toast('返回')}
          onClickRight={() => Toast('按钮')}
        />

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

      </div>


      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Profile