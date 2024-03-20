import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'


const Home = () => {
  return (
    <div className="layout">
      <div className="container">
        我是首页Home
        {/* <Outlet /> */}
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Home

