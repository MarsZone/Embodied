import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'


const Home = () => {

  const getRoute = (route) => console.log('father', route)

  return (
    <div className="layout">
      <div className="container">
        我是首页Home
        {/* <Outlet /> */}
      </div>
      <div className="footer">
        <TabNavigator onGetRoute={getRoute}/>
      </div>
    </div>
  )
}

export default Home

