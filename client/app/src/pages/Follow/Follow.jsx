import { followTopicsApi } from '@/apis/discover'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Follow.scoped.scss'
import Topic from '@/components/Topic/Topic'

const Follow = () => {
  //获取频道列表
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

  //跳转指定用户主页
  const navigate = useNavigate()
  const toTargetProfile = (targetUid) => {
    navigate(`/profile/${targetUid}`)
  }

  return (
    <div>
      <div className='follow-container'>
        {topicList.map((item, index) => (
          <Topic
            key={index}
            id={item.topic.id}
            title={item.topic.title}
            channelKey={item.topic.channelKey}
            content={item.topic.content}
            coverImg={item.topic.coverImg}
            coverUrl={item.topic.coverUrl}
            authorUid={item.userInfo.nickName}
            updateTime={item.topic.updateTime}
            likes={item.topic.likes}
            bookmarks={item.topic.bookmarks}
            comments={item.topic.comments}
            toTargetProfile={toTargetProfile}
          />
        ))
        }
      </div>
    </div>
  )
}

export default Follow