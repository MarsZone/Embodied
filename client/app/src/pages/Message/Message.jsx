import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'

const Message = () => {
  return (
    <div className="layout">
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