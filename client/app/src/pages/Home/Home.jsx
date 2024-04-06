import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Search, Image, NavBar, Toast } from 'react-vant'
import { useState } from 'react'



const Home = () => {
  const [value, setValue] = useState('');


  return (
    <div className="layout">

      <NavBar className='top-bar'
        leftText={<Search value={value} onChange={setValue} clearable placeholder="请输入搜索关键词" />}
        rightText="搜索"
        //onClickLeft={() => Toast('返回')}
        onClickRight={() => Toast('搜索')}
      />

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

