import { followTopicsApi } from '@/apis/discover'
import { useState } from 'react'
import {
  Image, NavBar, Toast, Tabs, Sticky, Typography
} from 'react-vant'
import { Arrow, CommentO, LikeO, BookmarkO } from '@react-vant/icons'
import useChannelList from '@/hooks/useChannelList'

const Follow = () => {


  //获取频道列表
  const { channelList, loading } = useChannelList()
  const [topicList, setTopicList] = useState([])

  const fetchTopicList = async () => {
    const res = await followTopicsApi
    console.log('follow页返回：', res)
  }

  //根据channelKey获取name
  const getChannelNameByKey = (key) => {
    const channel = channelList.find(item => item.key === key)
    return channel ? channel.name : ''
  }

  return (
    <div>
      <div className='topic-container'>
        {/* {topicList.map((topic, index) => (
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
        } */}
      </div>
    </div>
  )
}

export default Follow