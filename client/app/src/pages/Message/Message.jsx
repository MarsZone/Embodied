import React from 'react'
import { NavBar, Toast } from 'react-vant'
import TabNavigator from '@/components/TabNavigator/TabNavigator'

const Message = () => {
  return (
    <div className="layout">
      <NavBar
        title="消息"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />
      <div className="container">
        我是消息页Message
        {/* <Outlet /> */}
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Message