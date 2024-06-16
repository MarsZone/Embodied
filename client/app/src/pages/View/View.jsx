import { exploreTopicsApi, followTopicsApi } from '@/apis/discover'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topic from '@/components/Topic/Topic'

const View = () => {
  //获取频道列表
  const [topicList, setTopicList] = useState([])

  //初始化
  useEffect(() => {
    fetchTopicList()
  }, [])

  const fetchTopicList = async () => {
    const res = await exploreTopicsApi()
    setTopicList(res.data)
    console.log('view页返回：', res)
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

export default View