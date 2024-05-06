import { getIndividualTopic } from "@/apis/topic";
import useUserDetail from "@/hooks/useUserDetail";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "react-vant";

const TopicDetail = () => {
  const { topicId } = useParams()
  const [topicDetail, setTopicDetail] = useState(null)

  useEffect(async () => {
    //获取话题详情
    const topicRes = await getIndividualTopic(topicId)
    setTopicDetail(topicRes.data)
  }, [topicId])

  if (!topicDetail) {
    return <div>Loading...</div>
  }

  const topicTitle = topicDetail.title
  const authorUid = topicDetail.authorUid
  const topicContent = topicDetail.content
  const publishTime = topicDetail.publishTime
  const topicLikes = topicDetail.topicLikes
  const topicComments = topicDetail.comments
  const topicVisits = topicDetail.topicVisits

  //调用自定义hook获取用户数据
  //const { getUserData } = useUserDetail(authorUid)
  //根据用户id获取用户数据
  // const userDetail = useUserDetail(authorUid)

  return (
    <div>
      <NavBar
        title="话题"
        leftText="返回"
        onClickLeft={() => { }}
      />

      <div>
        {/* <div>用户名： {userDetail.userName} </div> */}
        {/* <img src={userDetail.avatarUrl}></img> */}
      </div>
      <p>id: {topicId}</p>
      <p>content: {topicDetail.content}</p>
    </div>
  )
}


export default TopicDetail