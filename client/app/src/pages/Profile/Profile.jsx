import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'

const Profile = () => {
  return (
    <div className="layout">
      <div className="container">
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