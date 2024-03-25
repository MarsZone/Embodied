import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'

const Post = () => {
  return (
    <div className="layout">
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