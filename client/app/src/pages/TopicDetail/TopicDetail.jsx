import { previewFileApi } from "@/apis/file";
import { getCommentsApi, getIndividualTopicApi, likeApi, postCommentApi } from "@/apis/topic";
import { getProfileAPI } from "@/apis/user";
import useUserDetail from "@/hooks/useUserDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image, NavBar, Typography, Divider, ActionBar, Popup, Input } from "react-vant";
import { Star, LikeO, BookmarkO, ShareO } from '@react-vant/icons'
import './TopicDetail.scss'

const TopicDetail = () => {
  const { topicId } = useParams()
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
  const [likeFlag, setLikeFlag] = useState()

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

    //根据用户id获取用户数据
    // const userDetail = useUserDetail(topicDetail.authorUid)
    // setUserProfile(userDetail)

    console.log('话题id：', topicId)
    console.log('话题详情：', topicRes.data.title)
    console.log('用户详情：', userProfileRes.data)
    console.log('用户头像：', userAvatarRes.data)
    console.log('话题评论：', topicCommentsRes.data)
  }

  //发表评论
  const onSubmitComment = () => {
    const submitComment = { tid: topicId, content: comment }
    console.log('发表评论：', submitComment)
    postCommentApi(submitComment)
    setComment('')
    setCommentEditVisible(false)
  }

  //点赞
  const onClickLike = async () => {
    const likeRes = await likeApi(topicId)
    if (likeRes.data === 'like') {

    }
  }

  // if (!topicDetail) {
  //   return <div>Loading...</div>
  // }

  return (
    <div>
      <NavBar
        title="话题"
        leftText="返回"
      // onClickLeft={() => }
      />

      {topicDetail === null || userProfile === null ||
        avatarUrl === null || topicComments === null ? (
        <div>loading...</div>
      ) : (
        <div>
          {/* <Typography>
            <Typography.Title level={3}>标题: {topicDetail.title}</Typography.Title>
            <Typography.Text>内容：{topicDetail.content}</Typography.Text>
          </Typography> */}
          <h3>标题: {topicDetail.title}</h3>
          <p>内容：{topicDetail.content}</p>

          <Divider>分隔</Divider>
          <Image round width='80px' height='80px' src={avatarUrl} />
          <div>用户名: {userProfile.userName}</div>
          <div>发布时间: {topicDetail.publishTime}</div>

          <p>评论</p>
          {topicComments.map(item => (
            <div>评论内容： {item.content} </div>
          ))}


          <ActionBar>
            {/* <ActionBar.Button
              className="comment-button"
              // plain
              // type='default'
              size='normal'
              text='留下你的评论吧...'
              onClick={() => console.log('button click')}
            /> */}
            <Button
              className="comment-button"
              size='normal'
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

            <ActionBar.Icon
              icon={<LikeO color='red' />}
              text='点赞'
              onClick={onClickLike}
            />
            <ActionBar.Icon icon={<BookmarkO color='red' />} text='收藏' />
            <ActionBar.Icon icon={<ShareO color='red' />} text='分享' />
          </ActionBar>

        </div>
      )}
    </div>
  )
}

export default TopicDetail