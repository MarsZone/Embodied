import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Search, Image, NavBar, Toast, Tabs } from 'react-vant'
import { useState } from 'react'
import './Home.scss'



const Home = () => {
  const [value, setValue] = useState('');


  return (
    <div className="layout">

      {/* <NavBar className='top-bar'
        leftText={<Search value={value} onChange={setValue} clearable placeholder="请输入搜索关键词" />}
        rightText="搜索"
        onClickRight={() => Toast('搜索')}
      /> */}

      <NavBar
        title="首页"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />

      <div className="container">
        <Tabs>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <Tabs.TabPane key={item} title={`标签${item}`}>
              内容 {item}
            </Tabs.TabPane>
          ))}
        </Tabs>

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

