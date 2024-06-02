import { previewFileApi } from "@/apis/file";
import { addBookmarkApi, getCommentsApi, getIndividualTopicApi, getTopicActionApi, likeApi, postCommentApi, removeBookmarkApi } from "@/apis/topic";
import { getProfileAPI } from "@/apis/user";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image, NavBar, ActionBar, Popup, Input, Toast } from "react-vant";
import { LikeO, BookmarkO, ShareO, Bookmark, Like} from '@react-vant/icons'
import './TopicDetail.scss'
import dayjs from "dayjs";

const TopicDetail = () => {
  const { topicId } = useParams()
  const navigate = useNavigate()
  const [topicDetail, setTopicDetail] = useState({})
  const [userProfile, setUserProfile] = useState({
    userName: '',
    email: '',
    phone: '',
    userDetail: {
      id: null,
      uid: null,
      firstName: '',
      secondName: '',
      nickName: '',
      gender: '',
      birthdate: '',
      country: '',
      address: '',
      avatar: '',
      createTime: ''
    }
  })
  const [avatarUrl, setAvatarUrl] = useState('')
  const [topicComments, setTopicComments] = useState([])
  const [comment, setComment] = useState()
  const [commentEditVisible, setCommentEditVisible] = useState(false) //评论弹出层状态
  const [likeFlag, setLikeFlag] = useState(false)
  const [bookmarkFlag, setBookmarkFlag] = useState(false)
  const [shareFlag, setShareFlag] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    //获取话题详情
    const topicRes = await getIndividualTopicApi(topicId)
    setTopicDetail(topicRes.data)

    //获取用户信息
    // const uid = parseInt(topicDetail.authorUid)
    const userProfileRes = await getProfileAPI(topicRes.data.authorUid)
    setUserProfile(userProfileRes.data)

    //获取用户头像url (设定一个默认头像，暂定为5)
    var avatarId = parseInt(userProfileRes.data.userDetail.avatar) === null ? 5 : parseInt(userProfileRes.data.userDetail.avatar)
    const userAvatarRes = await previewFileApi(avatarId)
    setAvatarUrl(userAvatarRes.data)

    //获取话题评论
    const topicCommentsRes = await getCommentsApi(topicId)
    setTopicComments(topicCommentsRes.data)

    //获取话题初始状态
    const getTopicActionRes = await getTopicActionApi(topicId)
    setLikeFlag(getTopicActionRes.data.isLike)
    setBookmarkFlag(getTopicActionRes.data.isBookMark)
    setShareFlag(getTopicActionRes.data.isShare)
    console.log('话题初始状态：', getTopicActionRes.data)

    //根据用户id获取用户数据
    // const userDetail = useUserDetail(topicDetail.authorUid)
    // setUserProfile(userDetail)

    console.log('话题id：', topicId)
    console.log('用户详情：', userProfileRes.data)
    console.log('用户头像：', userAvatarRes.data)
  }

  //刷新评论
  const commentRefresh = async () => {
    const topicCommentsRes = await getCommentsApi(topicId)
    setTopicComments(topicCommentsRes.data)
  }


  //发表评论
  const onSubmitComment = async () => {
    const submitComment = { tid: topicId, content: comment }
    console.log('发表评论：', submitComment)
    await postCommentApi(submitComment)
    setComment('')
    setCommentEditVisible(false)

    //刷新评论
    commentRefresh()
  }


  //点赞
  const onClickLike = async () => {
    const likeRes = await likeApi(topicId)
    if (likeRes.data === 'like') {
      setLikeFlag(true)
      Toast.info('已赞')
    } else if (likeRes.data === 'unlike') {
      setLikeFlag(false)
      Toast.info('取消赞')
    }
  }

  //收藏
  const onClickBookmark = async () => {
    if (bookmarkFlag === false) {
      const addBookmarkRes = await addBookmarkApi(topicId)
      addBookmarkRes.code === 20000 ? setBookmarkFlag(true) : bookmarkFlag(false)
      Toast.info('已收藏')
    } else if (bookmarkFlag === true) {
      const removeBookmarkRes = await removeBookmarkApi(topicId)
      removeBookmarkRes.code === 20000 ? setBookmarkFlag(false) : bookmarkFlag(false)
      Toast.info('取消收藏')
    }
  }

  //分享
  const onClickShare = () => {
    Toast.info('开发中...')
  }


  // if (!topicDetail) {
  //   return <div>Loading...</div>
  // }

  //dayjs
  // console.log('当前时间：', dayjs())
  // console.log('发布时间：', dayjs(topicDetail.publishTime).format('YYYY-MM-DD HH:mm'))
  // const timeDisplay = (dt) => {
  //   const currentTime = dayjs()
  // }


  return (
    <div>
      <NavBar
        title="话题详情"
        leftText=""
        onClickLeft={() => navigate(-1)}
      />

      {topicDetail === null || userProfile === null ||
        avatarUrl === null || topicComments === null ||
        likeFlag === null ? (
        <div>loading...</div>
      ) : (
        <div className="topic-container">
          <div className="top-info">
            <div className="author-avatar">
              <Image round src={avatarUrl} />
            </div>
            <div className="top-info-right">
              <div className="author-name"> {userProfile.userName}</div>
              <div className="post-time"> {topicDetail.publishTime}</div>
            </div>
          </div>

          <div className="topic-box">
            <div className="topic-title">
              {topicDetail.title}
            </div>
            <div className="topic-content">
              {topicDetail.content}
            </div>
            <div className="topic-visits">
              {topicDetail.visits} 次浏览
            </div>
          </div>

          <div className="comment-box">
            <div className="comment-count">共 {topicDetail.comments} 条评论</div>

            {topicComments.map(item => (
              <div className="indv-comment">
                <div className="commenter-info">
                  {item.uid}
                </div>
                <div>
                  <div className="comment-text">{item.content} </div>
                  <div className="comment-time">{item.createTime} </div>
                  <hr className="comment-seperator"></hr>
                </div>
              </div>
            ))}
          </div>

          <ActionBar>
            <ActionBar.Button
              className="comment-button"
              text='留下你的评论吧...'
              onClick={() => setCommentEditVisible(true)}
            />
            <Popup
              visible={commentEditVisible}
              style={{ height: '30%' }}
              position='bottom'
              onClose={() => setCommentEditVisible(false)}
            >
              <Input
                suffix={
                  <Button size="small" type="primary" onClick={onSubmitComment}>
                    发送
                  </Button>}
                placeholder="留下你的评论吧..."
                value={comment}
                onChange={text => setComment(text)}
              />
            </Popup>

            {likeFlag ?
              <ActionBar.Icon
                icon={<Like color='red' />}
                text={topicDetail.likes + 1}
                onClick={onClickLike}
              /> : <ActionBar.Icon
                icon={<LikeO color='red' />}
                text={topicDetail.likes}
                onClick={onClickLike}
              />
            }

            {bookmarkFlag ?
              <ActionBar.Icon
                icon={<Bookmark color='red' />}
                text={topicDetail.bookmarks + 1}
                onClick={onClickBookmark} />
              : <ActionBar.Icon
                icon={<BookmarkO color='red' />}
                text={topicDetail.bookmarks}
                onClick={onClickBookmark} />
            }

            <ActionBar.Icon
              icon={<ShareO color='red' />}
              text={topicDetail.shares}
              onClick={onClickShare} />
          </ActionBar>

        </div>
      )}
    </div>
  )
}

export default TopicDetail