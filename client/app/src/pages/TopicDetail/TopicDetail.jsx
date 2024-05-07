import { previewFileApi } from "@/apis/file";
import { getCommentsApi, getIndividualTopicApi, postCommentApi } from "@/apis/topic";
import { getProfileAPI } from "@/apis/user";
import useUserDetail from "@/hooks/useUserDetail";
import { request } from "@/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image, NavBar, Typography, Divider, ActionBar, Popup, Input } from "react-vant";
import { CartO, ChatO, Star } from '@react-vant/icons'
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

  //评论弹出层状态
  const [commentEditVisible, setCommentEditVisible] = useState(false)

  //发表评论
  const [comment, setComment] = useState()
  const onSubmitComment = () => {
    const submitComment = { tid: topicId, content: comment}
    console.log('发表评论：', submitComment)
    postCommentApi(submitComment)
    setComment('')
    setCommentEditVisible(false)
  }



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

            <ActionBar.Icon icon={<ChatO color='red' />} text='客服' />
            <ActionBar.Icon icon={<CartO color='red' />} text='购物车' />
            <ActionBar.Icon icon={<Star color='red' />} text='店铺' />
          </ActionBar>

        </div>
      )}
    </div>
  )
}

export default TopicDetail