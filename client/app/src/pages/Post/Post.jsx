import React from 'react'
import { Image, NavBar, Toast, Flex } from 'react-vant'
import TabNavigator from '@/components/TabNavigator/TabNavigator'

const Post = () => {
  return (



    <div className="layout">

      <NavBar
        className='nav-bar'
        title='发布话题'
        leftText='返回'
        onClickLeft={() => Toast('返回')}
        //rightText={<Edit fontSize={20} />}
        //onClickRight={() => navigate('/userDetail')}
      />



      <div className="container">
        我是发布消息页Post
        {/* <Outlet /> */}
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Post