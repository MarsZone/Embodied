import React, { useEffect} from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import {
  Image, NavBar, Toast, Tabs, Sticky, Typography
} from 'react-vant'
import { Arrow, CommentO, LikeO, BookmarkO} from '@react-vant/icons'
import { useState } from 'react'
import './Home.scoped.scss'
import useChannelList from '@/hooks/useChannelList'
import { getChannelTopicsApi } from '@/apis/topic'
import { previewFileApi } from '@/apis/file'
import { Link } from 'react-router-dom'
import { getProfileAPI } from '@/apis/user'


const Home = () => {
  //获取频道列表
  const { channelList, loading } = useChannelList()
  const [channelTopics, setChannelTopics] = useState([])
  const [coverUrl, setCoverUrl] = useState()

  //点击频道切换
  const onTabClick = async (channel) => {
    const channelKey = await channel.name
    console.log('选中频道：', channelKey)
    //根据切换的channelKey，切换展示的话题
    const channelTopicsRes = await getChannelTopicsApi(channelKey)
    setChannelTopics(channelTopicsRes.data)
  }

  //获取发布者用户
  const getUsername = async (uid) => {
    // const { userProfile, avatarUrl } = useUserDetail(uid)
    const getProfileRes = await getProfileAPI(uid)
    const username = getProfileRes.data.userName
    console.log(getProfileRes.data)
    return username
  }

  // const getUsername = (uid) => {
  //   return getProfileAPI(uid)
  //     .then(response => response.data.userName)
  //     .catch(error => {
  //       console.error("Error fetching username:", error);
  //       return "";
  //     });
  // }

  //在组件挂载时，加载初始话题列表
  const fetchDefaultChannelTopics = async () => {
    console.log('频道1：', channelList[0].key)
    const defaultChannelKey = channelList[0].key
    const channelTopicsRes = await getChannelTopicsApi(defaultChannelKey)
    setChannelTopics(channelTopicsRes.data)
  }

  //根据channelKey获取name
  const getChannelNameByKey = (key) => {
    const channel = channelList.find(item => item.key === key)
    return channel ? channel.name : ''
  }

  //根据tid获取url
  const fetchCoverUrl = async () => {
    const getUrlRes = await previewFileApi(5)
    setCoverUrl(getUrlRes.data)
    console.log('获取url：', getUrlRes.data)
  }


  const url = "http://120.78.142.84:9000/embodied/20240409231020112-5b8bec60-1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=9mheJLVpHTohzMYlOcXl%2F20240511%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240511T090600Z&X-Amz-Expires=36000&X-Amz-SignedHeaders=host&X-Amz-Signature=e01a89b2f9d332f3c43199e4d4532d497c03497121453795fb5e84388a2beb80"
  console.log('示例url：', url)

  useEffect(() => {
    if (!loading) {
      fetchDefaultChannelTopics()

      fetchCoverUrl()
    }
  }, [channelList, loading])

  console.log(channelList)


  return (
    <div className="layout">

      <Sticky>
        <NavBar
          title="首页"
          rightText="按钮"
          onClickRight={() => Toast('按钮')}
        />
      </Sticky>

      <div className="container">
        <Tabs
          sticky offsetTop={46}
          onClickTab={v => onTabClick(v)}>
          {channelList.map(item => (
            <Tabs.TabPane key={item.key} title={`${item.name}`} name={item.key}>

              {channelTopics.map((topic, index) => (
                <div className='topic-outer-box' key={index}>
                  <div className='topic-inner-box'>
                    <Link to={`/topicDetail/${topic.id}`} className='topic-link'>
                      <div className='topic-header'>
                        <div className='topic-channel'>{getChannelNameByKey(topic.channelKey)}</div>
                        <div className='topic-title'>{topic.title}</div>
                        <Arrow></Arrow>
                      </div>
                    </Link>

                    <Typography.Text
                      className='topic-content'
                      ellipsis={2}>
                      内容：{topic.content}
                    </Typography.Text>

                    <div className='topic-cover'>
                      <Image
                        src={coverUrl}
                        fit='cover' />
                    </div>

                    <div className='topic-bottom'>
                      <div>
                        发布者{topic.authorUid}·{topic.updateTime}
                      </div>
                      <div className='topic-bottom-right'>
                        <div> <LikeO />{topic.likes}</div>
                        <div> <BookmarkO />{topic.bookmarks}</div>
                        <div> <CommentO />{topic.comments}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              }
            </Tabs.TabPane>
          ))}
        </Tabs>

      </div>
      <div className="footer">
        <TabNavigator />
      </div>
    </div>
  )
}

export default Home

