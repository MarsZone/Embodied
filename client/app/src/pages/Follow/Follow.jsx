import { followTopicsApi } from '@/apis/discover'
import { useEffect, useState } from 'react'
import {
  Image, NavBar, Toast, Tabs, Sticky, Typography
} from 'react-vant'
import { Arrow, CommentO, LikeO, BookmarkO } from '@react-vant/icons'
import useChannelList from '@/hooks/useChannelList'
import { useNavigate } from 'react-router-dom'
import './Follow.scoped.scss'

const Follow = () => {

  //获取频道列表
  const { channelList, loading } = useChannelList()
  const [topicList, setTopicList] = useState([])

  //初始化
  useEffect(() => {
    fetchTopicList()
  }, [])

  const fetchTopicList = async () => {
    const res = await followTopicsApi()
    setTopicList(res.data.topicPostList)
    console.log('follow页返回：', res)
  }

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
      <div className='follow-container'>
        {topicList.map((item, index) => (
          <div className='topic-box' key={index}>
            <a className='topic-box__link' href={`/topicDetail/${item.topic.id}`} >
              <div className='topic-header'>
                <div className='topic-header topic-header__title'>
                  {item.topic.title}
                </div>
                <div className='topic-header topic-header__channel'>
                  {getChannelNameByKey(item.topic.channelKey)}
                </div>
                <Arrow></Arrow>
              </div>
            </a>

            <div className='topic-content'>
              内容：{item.topic.content}
            </div>

            {item.topic.coverImg ? (
              <div className='topic-cover'>
                <Image
                  src={item.topic.coverUrl}
                  fit='cover'
                />
              </div>
            ) : (
              <div></div>
            )}

            <div className='topic-bottom'>
              <div>
                <span onClick={() => toTargetProfile(item.userInfo.authorUid)}>
                  uid{item.userInfo.nickName}
                </span>
                <span> · {item.topic.updateTime} </span>
              </div>
              <div className='topic-bottom topic-bottom__right'>
                <div> <LikeO />{item.topic.likes}</div>
                <div> <BookmarkO />{item.topic.bookmarks}</div>
                <div> <CommentO />{item.topic.comments}</div>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Follow