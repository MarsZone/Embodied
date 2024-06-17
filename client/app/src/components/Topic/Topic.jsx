import { Image } from 'react-vant'
import { Arrow, CommentO, LikeO, BookmarkO } from '@react-vant/icons'
import useChannelList from '@/hooks/useChannelList'
import './Topic.scoped.scss'

const Topic = ({
  id,
  title,
  channelKey,
  content,
  coverImg,
  coverUrl,
  authorUid,
  updateTime,
  likes,
  bookmarks,
  comments,
  toTargetProfile,
}) => {

  //根据channelKey获取name
  const { channelList, loading } = useChannelList()
  const getChannelNameByKey = (key) => {
    const channel = channelList.find(item => item.key === key)
    return channel ? channel.name : ''
  }

  return (
    <div className='topic-box'>
      <a className='topic-box__link' href={`/topicDetail/${id}`} >
        <div className='topic-header'>
          <div className='topic-header topic-header__title'>
            {title}
          </div>
          <div className='topic-header topic-header__channel'>
            {getChannelNameByKey(channelKey)}
          </div>
          <Arrow />
        </div>
      </a>

      <div className='topic-content'>
        内容：{content}
      </div>

      {coverImg ? (
        <div className='topic-cover'>
          <Image
            src={coverUrl}
            fit='cover'
          />
        </div>
      ) : (
        <div></div>
      )}

      <div className='topic-bottom'>
        <div>
          <span onClick={() => toTargetProfile(authorUid)}>
            uid{authorUid}
          </span>
          <span> · {updateTime} </span>
        </div>
        <div className='topic-bottom topic-bottom__right'>
          <div> <LikeO />{likes}</div>
          <div> <BookmarkO />{bookmarks}</div>
          <div> <CommentO />{comments}</div>
        </div>
      </div>
    </div>
  );
}


export default Topic