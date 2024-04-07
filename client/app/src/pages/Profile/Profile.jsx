import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Image, NavBar, Toast, Flex, Tabs} from 'react-vant'
import { Edit } from '@react-vant/icons'
import './Profile.scss'

const Profile = () => {

  const tabs = ["收藏", "点赞", "历史"];

  const src = 'https://img.yzcdn.cn/vant/cat.jpeg'

  return (

    <div className="layout">

      <NavBar
        className='nav-bar'
        title='我的'
        leftText='返回'
        onClickLeft={() => Toast('返回')}
        rightText={<Edit fontSize={20} />}
        onClickRight={() => Toast('按钮')}
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
                <div className='count'>111</div>关注
              </Flex.Item>
              <Flex.Item span={8}>
                <div className='count'>222</div>粉丝
              </Flex.Item>
              <Flex.Item span={8}>
                <div className='count'>333</div>获赞
              </Flex.Item>
            </Flex>
          </div>
        </div>

        <div className='bottom-layout'>
          <Tabs className='bottom-tabs'>
            {tabs.map(
              item => (
                <Tabs.TabPane key={item} title={item}>
                  我是用户信息页Profile
                </Tabs.TabPane>
              )
            )}
          </Tabs>
          我是用户信息页Profile
        </div>

        {/* <Outlet /> */}
      </div>




      <div className="footer">
        <TabNavigator />
      </div>


    </div>
  )
}

export default Profile