import React, { useEffect } from 'react'
import TabNavigator from '@/components/TabNavigator/TabNavigator'
import {
  Image, NavBar, Toast, Tabs, Sticky, Typography
} from 'react-vant'
import { Arrow, CommentO, LikeO, BookmarkO } from '@react-vant/icons'
import { useState } from 'react'
import './Home.scoped.scss'
import useChannelList from '@/hooks/useChannelList'
import { getChannelTopicsApi } from '@/apis/topic'
import { previewFileApi } from '@/apis/file'
import { Link, useNavigate } from 'react-router-dom'
import { getProfileAPI } from '@/apis/user'


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

  //根据channelKey获取name
  const getChannelNameByKey = (key) => {
    const channel = channelList.find(item => item.key === key)
    return channel ? channel.name : ''
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
                  <div className='topic-box' key={index}>
                    <a className='topic-box__link' href={`/topicDetail/${topic.id}`} >
                      <div className='topic-header'>
                        <div className='topic-header topic-header__title'>
                          {topic.title}
                        </div>
                        <div className='topic-header topic-header__channel'>
                          {getChannelNameByKey(topic.channelKey)}
                        </div>
                        <Arrow></Arrow>
                      </div>
                    </a>

                    <div className='topic-content'>
                      内容：{topic.content}
                    </div>


                    {topic.coverImg ? (
                      <div className='topic-cover'>
                        <Image
                          src={topic.coverUrl}
                          fit='cover'
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}

                    <div className='topic-bottom'>
                      <div>
                        <span onClick={() => toTargetProfile(topic.authorUid)}>
                          uid{topic.authorUid}
                        </span>
                        <span> · {topic.updateTime} </span>
                      </div>
                      <div className='topic-bottom topic-bottom__right'>
                        <div> <LikeO />{topic.likes}</div>
                        <div> <BookmarkO />{topic.bookmarks}</div>
                        <div> <CommentO />{topic.comments}</div>
                      </div>
                    </div>
                  </div>
                ))
                }
              </div>
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

