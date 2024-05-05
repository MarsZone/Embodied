import React, { useEffect } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import { Image, NavBar, Toast, Tabs, Card, Space, Button } from 'react-vant'
import { Arrow, Like } from '@react-vant/icons'
import { useState } from 'react'
import './Home.scoped.scss'
import useChannelList from '@/hooks/useChannelList'
import { getChannelTopics } from '@/apis/topic'
import { previewFileApi } from '@/apis/file'



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
              {channelTopics.map(topic => (
                <Card round
                  key={topic.id}>
                  <Card.Header>{topic.title}</Card.Header>
                  <Card.Cover>
                    {/* <Image src={ previewFileApi(topic.coverImg).data } /> */}
                    <Image src={ previewFileApi(46).data } />
                  </Card.Cover>
                  <Card.Body>
                    内容：{topic.content}
                  </Card.Body>
                  <Card.Footer>
                    <Space>
                      <Button round size='small'>
                        更多
                      </Button>
                      <Button
                        icon={<Like />}
                        round
                        color='linear-gradient(to right, #ff6034, #ee0a24)'
                        size='small'
                      >
                        Like
                      </Button>
                    </Space>
                  </Card.Footer>
                </Card>
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

