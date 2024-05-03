import React, { useEffect } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Image, NavBar, Toast, Tabs } from 'react-vant'
import { useState } from 'react'
import './Home.scoped.scss'
import useChannelList from '@/hooks/useChannelList'
import { getChannelTopics } from '@/apis/topic'



const Home = () => {
  //获取频道列表
  const { channelList, loading } = useChannelList()
  const [selectChannel, setSelectChannel] = useState()
  const [channelTopics, setChannelTopics] = useState([])

  //点击频道切换
  const onTabClick = async (channel) => {
    const channelKey = await channel.name
    console.log('选中频道：', channelKey)

    //根据切换的channelKey，切换展示的话题
    const channelTopicsRes = await getChannelTopics(channelKey)
    setChannelTopics(channelTopicsRes.data)
  }

  useEffect(() => {
    console.log('频道话题：', channelTopics)
  }, [channelTopics])




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
              内容 {item.name}{item.key}
              {
                channelTopics.map(topic => (
                  <div>标题：{ topic.title }
                  内容：{ topic.content }</div>
                ))
              }
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

