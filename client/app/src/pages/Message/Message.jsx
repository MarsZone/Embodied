import React, { useEffect, useState } from 'react'
import { NavBar, Badge, Image } from 'react-vant'
import { getMsgHistoryApi } from '@/apis/message'
import './Message.scoped.scss'
import { previewFileApi } from '@/apis/file'
import { useNavigate } from 'react-router-dom'
import { FriendsO } from '@react-vant/icons';

const Message = () => {
  const navigate = useNavigate()
  const [msgHisList, setMsgHisList] = useState([])
  const [avatarUrl, setAvatarUrl] = useState()

  //初始化数据
  useEffect(() => {
    fetchMsgHistory()
  }, [])

  //获取消息历史
  const fetchMsgHistory = async () => {
    const res = await getMsgHistoryApi()
    const list = res.data

    //拼接avatarUrl
    const listWithAvatar = await Promise.all(list.map(async item => {
      let avatarRes = await previewFileApi(item.senderAvatar)
      return { ...item, senderAvatarUrl: avatarRes.data }
    }))
    console.log('拼接后的消息List：', listWithAvatar)
    setMsgHisList(listWithAvatar)
  }

  //点击跳转对应sender的聊天页面
  const onClickSender = (targetId, senderNickName, senderAvatarUrl) => {
    navigate('/chat', { state: { targetId, senderNickName, senderAvatarUrl } })
  }

  return (
    <div className="message-layout">
      <NavBar
        title="消息"
        leftText={<FriendsO fontSize='1.8rem' />}
        rightText="添加好友"
        onClickLeft={() => navigate('/myFriends')}
        onClickRight={() => navigate('/newFriend')}
      />
      {msgHisList === null || avatarUrl === null ? (
        <div> loading... </div>
      ) : (
        <div>
          {msgHisList.map((msg, index) => (
            <div
              key={index}
              className='msg-box'
              onClick={() => onClickSender(msg.senderId, msg.senderNickName, msg.senderAvatarUrl)}
            >
              <div className='msg-left'>
                <Image
                  cover round
                  className='msg-avatar'
                  src={msg.senderAvatarUrl} />
              </div>

              <div className='msg-right'>
                <div className='msg-content'>
                  <div className='msg-sender'>
                    {msg.senderNickName}
                  </div>
                  <div className='msg-last-time'>
                    {msg.lastMsgDateTime}
                  </div>
                </div>
                <div className='msg-lastMsg'>
                  <div className='msg-last-content'>
                    {msg.lastMsg}
                  </div>
                  <div>
                    <Badge content={msg.unReadCount} max="99" color='grey' />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>)
      }
    </div>
  )
}

export default Message