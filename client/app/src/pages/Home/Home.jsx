import React, { useEffect } from 'react'
import {
  Image, NavBar, Toast, Tabs, Sticky, Typography
} from 'react-vant'
import { Arrow, CommentO, LikeO, BookmarkO } from '@react-vant/icons'
import { useState } from 'react'
import './Home.scoped.scss'
import useChannelList from '@/hooks/useChannelList'
import { getChannelTopicsApi } from '@/apis/topic'
import { previewFileApi } from '@/apis/file'
import { useNavigate } from 'react-router-dom'
import { getProfileAPI } from '@/apis/user'
import Topic from '@/components/Topic/Topic'


const Home = () => {
  //获取频道列表
  const { channelList, loading } = useChannelList()
  const [topicList, setTopicList] = useState([])

  //在组件挂载时，加载初始话题列表
  const fetchChannelList = async () => {
    const channelKey = channelList[0].key
    const res = await getChannelTopicsApi(channelKey)
    const list = res.data

    //拼接coverUrl
    const topicListWithCover = await Promise.all(
      list.map(async topic => {
        const coverRes = await previewFileApi(topic.coverImg)
        return { ...topic, coverUrl: coverRes.data }
      })
    )
    console.log('拼接后的topicList：', topicListWithCover)
    setTopicList(topicListWithCover)
  }

  //初始化
  useEffect(() => {
    if (!loading) {
      fetchChannelList()
    }
  }, [channelList, loading])


  //点击频道切换
  const onTabClick = async (channel) => {
    const channelKey = await channel.name
    console.log('选中频道：', channelKey)
    //根据切换的channelKey，切换展示的话题
    const res = await getChannelTopicsApi(channelKey)
    const list = res.data

    //拼接coverUrl
    const topicListWithCover = await Promise.all(
      list.map(async topic => {
        const coverRes = await previewFileApi(topic.coverImg)
        return { ...topic, coverUrl: coverRes.data }
      })
    )
    console.log('拼接后的topicList：', topicListWithCover)
    setTopicList(topicListWithCover)
  }


  //跳转指定用户主页
  const navigate = useNavigate()
  const toTargetProfile = (targetUid) => {
    navigate(`/profile/${targetUid}`)
  }

  return (
    <div>
      <Sticky>
        <NavBar
          title="首页"
          leftArrow=""
        />
      </Sticky>

      <div className="bg-box">
        <Tabs
          sticky
          offsetTop={46}
          onClickTab={v => onTabClick(v)}
        >

          {channelList.map(item => (
            <Tabs.TabPane
              key={item.key}
              title={`${item.name}`}
              name={item.key}
            >
              <div className='topic-container'>
                {topicList.map((topic, index) => (
                  <Topic
                    key={index}
                    id={topic.postId}
                    title={topic.title}
                    channelKey={topic.channelKey}
                    content={topic.content}
                    coverImg={topic.coverImg}
                    coverUrl={topic.coverUrl}
                    authorUid={topic.authorUid}
                    updateTime={topic.updateTime}
                    likes={topic.likes}
                    bookmarks={topic.bookmarks}
                    comments={topic.comments}
                    toTargetProfile={toTargetProfile}
                  />
                ))
                }
              </div>
            </Tabs.TabPane>
          ))}

        </Tabs>
      </div>
    </div>
  )
}

export default Home

