import React from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Search, Image, NavBar, Toast, Tabs } from 'react-vant'
import { useState } from 'react'
import './Home.scoped.scss'
import useChannelList from '@/hooks/useChannelList'



const Home = () => {
  //获取频道列表
  const { channelList, loading } = useChannelList()
  const [ selectChannel, setSelectChannel ] = useState()

  //点击频道切换
  const onTabClick = (channel) => {
    console.log('选中频道：', channel.name)
    setSelectChannel(channel.name)
  }

  


  return (
    <div className="layout">

      <NavBar
        title="首页"
        rightText="按钮"
        onClickRight={() => Toast('按钮')}
      />

      <div className="container">
        <Tabs onClickTab={v => onTabClick(v)}>
          {channelList.map(item => (
            <Tabs.TabPane key={item.key} title={`${item.name}`} name={item.key}>
              内容 {item.name}
            </Tabs.TabPane>
          ))}
        </Tabs>


        {/* <Outlet /> */}
      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Home

